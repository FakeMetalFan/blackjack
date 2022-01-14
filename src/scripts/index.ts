import 'styles/index.scss';

import Button from 'buttons/button';
import Buttons from 'buttons';

import Deck from 'card-holders/deck'
import Hand from 'card-holders/hand';

import POPUP_TEXT from 'constants/popup-text';
import {
  RANKS,
} from 'constants/rank';
import {
  SUITS,
} from 'constants/suit';

import getElemById from 'utils/get-elem-by-id';

import Popup from './popup';

new (class {
  constructor(
    private buttons: Buttons,
    private popup: Popup,
    private deck: Deck,
    private dealer: Hand,
    private player: Hand,
  ) {
    this.buttons.deal.attachHandler(this.deal);
    this.buttons.reset.attachHandler(this.reset);
    this.buttons.hit.attachHandler(this.hit);
    this.buttons.stand.attachHandler(this.stand);

    (async () => {
      await this.deck.intro();
      await this.deck.shuffle();
      await this.deck.shuffle();
      this.buttons.deal.enable();
    })();
  }

  private deal = async () => {
    this.deck.setForeground(1);
    this.buttons.disableAll();

    await this.dealCard(this.player);
    await this.dealCard(this.player);
    await this.dealCard(this.dealer);
    await this.dealCard(this.dealer, false);

    if (this.player.blackjacked() || this.dealer.blackjacked()) {
      await this.dealer.peek.show();
      this.popup.show(POPUP_TEXT.BLACKJACK);
    } else {
      this.buttons.hit.enable();
      this.buttons.stand.enable();
    }

    this.buttons.reset.enable();
  };

  private reset = async () => {
    this.popup.hide();
    this.buttons.disableAll();
    this.deck.setForeground('');

    [
      this.player,
      this.dealer,
    ].forEach((hand) => {
      hand.items.forEach((card, index) => {
        const {
          x,
          y,
        } = card.getRect();
        const {
          x: dx,
          y: dy,
        } = this.deck.getRect();

        this.deck.push(card
          .setForeground(this.deck.size + hand.size + index)
          .setPoint(x - dx, y - dy)
          .hide(),
        );
      });

      hand.empty();
    });

    await this.deck.shuffle();
    await this.deck.shuffle();
    this.buttons.deal.enable();
  };

  private hit = async () => {
    this.buttons.disableAll();
    await this.dealCard(this.player);

    if (this.player.busted()) {
      this.popup.show(POPUP_TEXT.DEFEAT);
      this.buttons.reset.enable();
    } else if (this.player.enoughCards) {
      this.stand();
    } else {
      this.buttons.enableAllExceptDeal();
    }
  };

  private stand = async () => {
    this.buttons.disableAll();
    await this.dealer.peek.show();

    while (this.dealer.getScore() < 17 && !this.dealer.enoughCards) {
      await this.dealCard(this.dealer);
    }

    const dealerScore = this.dealer.getScore();
    const playerScore = this.player.getScore();

    if (this.dealer.busted() || dealerScore < playerScore) {
      this.popup.show(POPUP_TEXT.VICTORY);
    } else if (playerScore < dealerScore) {
      this.popup.show(POPUP_TEXT.DEFEAT);
    } else {
      this.popup.show(POPUP_TEXT.PUSH);
    }

    this.buttons.reset.enable();
  };

  private dealCard = async (hand: Hand, showFace = true) => {
    const {
      x,
      y,
    } = this.deck.getOffsetTop();
    const {
      x: dx,
      y: dy,
    } = hand.getRect();

    await hand
      .push(this.deck
        .pop()
        .setPoint(x - dx, y - dy),
      ).dragCard(showFace);
  };
})(
  new Buttons(
    new Button(getElemById('deal-btn')),
    new Button(getElemById('reset-btn')),
    new Button(getElemById('hit-btn')),
    new Button(getElemById('stand-btn')),
  ),
  new Popup(getElemById('popup')),
  new Deck(getElemById('deck'), SUITS, RANKS),
  new Hand(getElemById('dealer')),
  new Hand(getElemById('player')),
);
