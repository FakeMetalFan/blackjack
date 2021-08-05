import 'styles/index.scss';

import Blackjack from 'blackjack';
import Button from 'buttons/button';
import Buttons from 'buttons/buttons';
import Dealer from 'cardHolders/dealer';
import Deck from 'cardHolders/deck';
import Hand from 'cardHolders/hand';
import Players from 'cardHolders/players';
import { ranks } from 'constants/ranks';
import { suits } from 'constants/suits';
import Popup from 'popup';

const getElem = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;

// eslint-disable-next-line no-new
new Blackjack(
  new Buttons(
    new Button(getElem('deal-btn')),
    new Button(getElem('reset-btn')),
    new Button(getElem('hit-btn')),
    new Button(getElem('stand-btn'))
  ),
  new Popup(getElem('popup')),
  new Deck(getElem('deck'), suits, ranks),
  new Dealer(getElem('dealer')),
  new Players([
    new Hand(getElem('player-1')),
    new Hand(getElem('player-2')),
    new Hand(getElem('player-3')),
  ])
);
