/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */

import Post from './Post';
import Error from './Error';
import Geo from './Geo';

export default class Timeline {
  constructor(container) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.textarea = document.querySelector('.timeline-control__textbox');
    this.timeline = [];

    this.publishPost = this.publishPost.bind(this);
    this.fromLocalStorage = this.fromLocalStorage.bind(this);
    this.toLocalStorage = this.toLocalStorage.bind(this);

    // localStorage.clear()
  }

  bindToDOM() {
    document.addEventListener('DOMContentLoaded', this.fromLocalStorage);
    window.addEventListener('beforeunload', this.toLocalStorage);

    this.drawTimeline();

    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const error = new Error(this.textarea, 'Это поле не может быть пустым');

        const hasValue = this.textarea.value.trim();
        hasValue ? this.getCoords() : error.showError();
      }
    });
  }

  getCoords() {
    this.geo = new Geo(this.publishPost);
    this.geo.findGeo();
  }

  publishPost(coords) {
    this.timeline.unshift({
      text: this.textarea.value,
      created: Date.now(),
      geo: coords,
    });

    this.textarea.value = '';

    this.drawTimeline();
  }

  drawTimeline() {
    this.container.innerHTML = '';

    this.timeline.forEach(({ text, created, geo }) => {
      const post = new Post(text, created, geo);
      this.container.appendChild(post.post);
    });
  }

  fromLocalStorage() {
    if (localStorage.timeline) this.timeline = JSON.parse(localStorage.getItem('timeline'));
    this.drawTimeline();
  }

  toLocalStorage() {
    localStorage.setItem('timeline', JSON.stringify(this.timeline));
  }
}
