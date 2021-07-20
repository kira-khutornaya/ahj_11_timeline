export default class Error {
  constructor(target, message) {
    this.target = target;
    this.message = message;

    this.showError = this.showError.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  showError() {
    this.error = document.createElement('div');
    this.error.classList.add('error');

    this.error.innerHTML = `
      <div class="error__arrow"></div>
      <div class="error__text">${this.message}</div>
    `;

    document.body.appendChild(this.error);
    this.getPosition();
    this.target.blur();

    this.target.addEventListener('focus', this.removeError);
  }

  getPosition() {
    const { left, bottom } = this.target.getBoundingClientRect();

    this.error.style.left = `${window.scrollX + left - this.target.offsetWidth / 3 + this.error.offsetWidth / 2}px`;
    this.error.style.top = `${window.scrollY + bottom - this.target.offsetHeight * 3}px`;
  }

  removeError() {
    this.target.value = '';
    this.error.remove();
  }
}
