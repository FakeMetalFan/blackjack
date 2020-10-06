import { Blackjack } from './Blackjack';

import '@styles/index.scss';

new Blackjack({
  dealerElem: document.getElementById('dealer'),
  deckElem: document.getElementById('deck'),
  playerElem: document.getElementById('player'),
  popupElem: document.getElementById('popup'),
  dealBtnElem: document.getElementById('deal-btn'),
  resetBtnElem: document.getElementById('reset-btn'),
  hitBtnElem: document.getElementById('hit-btn'),
  standBtnElem: document.getElementById('stand-btn'),
});
