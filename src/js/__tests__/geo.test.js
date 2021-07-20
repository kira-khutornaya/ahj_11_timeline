import Geo from '../Geo';

test.each([
  ['51.50851, −0.12572', { latitude: '51.50851', longitude: '−0.12572' }],
  ['51.50851,3.12572', { latitude: '51.50851', longitude: '3.12572' }],
  ['[51.50851, −0.12572]', { latitude: '51.50851', longitude: '−0.12572' }],
  ['89.937, any text', { error: 'Данные введены некорректно' }],
  [',17', { error: 'Данные введены некорректно' }],
  ['27.75435', { error: 'Данные введены некорректно' }],
  ['17.362 268.873', { error: 'Данные введены некорректно' }],
  ['981.0976,54', { error: 'Данные введены некорректно' }],
])(('Coords value "%s" should check like %o'), (value, expected) => {
  const geo = new Geo();
  expect(geo.checkFormat(value)).toMatchObject(expected);
});
