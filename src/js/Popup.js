export default class Popup {
  constructor() {
    this.hidePopup = this.hidePopup.bind(this);
    this.showPopup = this.showPopup.bind(this);
  }

  showPopup(fn) {
    this.popup = document.createElement('div');
    this.popup.classList.add('popup');

    this.popup.innerHTML = `
      <div class="popup__body">
        <div class="popup__content">

          <h3 class="popup__title">Что-то пошло не так</h3>
          <div class="popup__text">
            <p>К сожалению, нам не удалось определить ваше местоположение. Пожалуйста, дайте разрешение на использование геолокации либо введите координаты вручную.</p>
            <p>Широта и долгота через запятую</p>
          </div>

          <form class="form">
            <input type="text" class="form-group__field" placeholder="00.00000, 00.00000">
            <div class="form__control">
              <button type="button" class="form-control__button button button__cancel">Отмена</button>
              <button type="submit" class="form-control__button button button__save">Ok</button>
            </div>
          </form> 

        </div>
      </div>
    `;

    document.body.appendChild(this.popup);

    this.form = this.popup.querySelector('form');
    this.input = this.form.querySelector('input.form-group__field');
    this.input.focus();
    this.cancelBtn = this.form.querySelector('.button__cancel');

    this.popup.addEventListener('click', this.onClickOver.bind(this));
    this.popup.addEventListener('submit', fn);
    this.cancelBtn.addEventListener('click', (e) => {
      this.hidePopup(e);
    });
  }

  hidePopup() {
    this.popup.remove();
  }

  onClickOver(e) {
    if (!e.target.classList.contains('popup__body')) return;

    e.preventDefault();
    this.hidePopup();
  }
}
