/* eslint class-methods-use-this: ["error", { "exceptMethods": ["checkGeoAPI", "checkFormat"] }] */

import Popup from './Popup';
import Error from './Error';

export default class Geo {
  constructor(fn) {
    this.fn = fn;
    this.popup = new Popup();

    this.checkValidity = this.checkValidity.bind(this);
  }

  findGeo() {
    this.checkGeoAPI().then((pos) => {
      this.fn(pos);
    }).catch(() => {
      this.popup.showPopup(this.checkValidity);
    });
  }

  checkGeoAPI() {
    if (!navigator.geolocation) {
      return new Promise((resolve, reject) => reject(new Error('Невозможно определить геолокацию')));
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      }, (error) => {
        reject(error);
      });
    });
  }

  checkValidity(e) {
    e.preventDefault();

    const geoValue = this.checkFormat(this.popup.input.value);
    if (geoValue.error) {
      new Error(this.popup.input, 'Введите значение в формате 00.00000, 00.00000').showError();
      return;
    }

    this.fn(geoValue);
    this.popup.hidePopup();
  }

  checkFormat(position) {
    const coords = position.split(',').map((coord) => coord.match(/[+|−|-|—|-]?\d{1,3}\.\d+/));
    if (!coords[0] || !coords[1]) return { error: 'Данные введены некорректно' };

    return { latitude: coords[0][0], longitude: coords[1][0] };
  }
}
