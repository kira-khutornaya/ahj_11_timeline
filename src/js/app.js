import Timeline from './Timeline';

const timeline = new Timeline('.timeline__area');
timeline.timeline = [
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, ducimus atque!',
    created: 1624896752320,
    geo: {
      latitude: 51.50851,
      longitude: -0.12572,
    },
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor commodi doloribus vero eligendi sequi voluptas odio? Iste, porro!',
    created: 1624696765577,
    geo: {
      latitude: 51.50851,
      longitude: -0.12572,
    },
  },
  {
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing.',
    created: 1622897753345,
    geo: {
      latitude: 51.50851,
      longitude: -0.12572,
    },
  },
];

timeline.bindToDOM();
