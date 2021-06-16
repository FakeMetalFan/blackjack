import 'styles/index.scss';

import Blackjack from 'blackjack';
import Button from 'buttons/button';
import Buttons from 'buttons/buttons';
import Dealer from 'cardHolders/dealer';
import Deck from 'cardHolders/deck';
import Hand from 'cardHolders/hand';
import { ranks } from 'constants/ranks';
import { suits } from 'constants/suits';
import Popup from 'popup';

const getElem = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;

// eslint-disable-next-line no-new
new Blackjack(
  new Buttons(
    new Button(getElem<HTMLButtonElement>('deal-btn')),
    new Button(getElem<HTMLButtonElement>('reset-btn')),
    new Button(getElem<HTMLButtonElement>('hit-btn')),
    new Button(getElem<HTMLButtonElement>('stand-btn'))
  ),
  new Popup(getElem<HTMLDivElement>('popup')),
  new Deck(getElem<HTMLDivElement>('deck'), suits, ranks),
  new Dealer(getElem<HTMLDivElement>('dealer')),
  new Hand(getElem<HTMLDivElement>('player'))
);
