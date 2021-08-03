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
    new Button(getElem('deal-btn') as HTMLButtonElement),
    new Button(getElem('reset-btn') as HTMLButtonElement),
    new Button(getElem('hit-btn') as HTMLButtonElement),
    new Button(getElem('stand-btn') as HTMLButtonElement)
  ),
  new Popup(getElem('popup') as HTMLDivElement),
  new Deck(getElem('deck') as HTMLDivElement, suits, ranks),
  new Dealer(getElem('dealer') as HTMLDivElement, 'Dealer'),
  new Players([
    new Hand(getElem('player-1'), 'Player 1', 90),
    new Hand(getElem('player-2'), 'Player 2', 45),
    new Hand(getElem('player-3'), 'Player 3'),
    new Hand(getElem('player-4'), 'Player 4', -45),
    new Hand(getElem('player-5'), 'Player 5', -90),
  ])
);
