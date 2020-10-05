import { Blackjack } from './Blackjack';

import '@styles/index.scss';

new Blackjack(
  document.getElementById('dealer'),
  document.getElementById('deck'),
  document.getElementById('player'),
  document.getElementById('popup'),
  document.getElementById('deal-btn'),
  document.getElementById('reset-btn'),
  document.getElementById('hit-btn'),
  document.getElementById('stand-btn'),
);
