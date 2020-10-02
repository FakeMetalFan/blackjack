import '@fortawesome/fontawesome-free/js/all.min';

import { Blackjack } from './Blackjack';

import '@styles/index.scss';

new Blackjack(
  document.getElementById('dealer'),
  document.getElementById('deck'),
  document.getElementById('player'),
  document.getElementById('popup'),
  document.getElementById('buttons')
);
