export default class Post {
  constructor(text, created, geo) {
    this.id = created;
    this.text = text;
    this.geo = geo;

    const date = new Date(created).toLocaleString().substring(0, 10);
    const time = new Date(created).toLocaleTimeString().substring(0, 5);

    this.post = document.createElement('div');
    this.post.classList.add('timeline-area__item');
    this.post.innerHTML = `
      <div class="timeline-item__info">
        <div class="timeline-item__geo">[${this.geo.latitude}, ${this.geo.longitude}]</div>
        <div class="timeline-item__date">${date} ${time}</div>
      </div>
      <div class="timeline-item__text">${this.text}</div>
    `;
  }
}
