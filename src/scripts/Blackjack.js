import { Dealer, Hand, Deck } from './card-stack';

import { suits, ranks, popupMessage } from './const';

import { Buttons } from './buttons';

import { Popup } from './Popup';

import { CardSupplier } from './CardSupplier';

export class Blackjack {
  _dealer;
  _deck;
  _player;
  _popup;
  _buttons;

  _cardSupplier;

  constructor(
    { dealerElem, deckElem, playerElem, popupElem, dealBtnElem, resetBtnElem, hitBtnElem, standBtnElem }
  ) {
    this._dealer = new Dealer(dealerElem);
    this._deck = new Deck(deckElem, suits, ranks);
    this._player = new Hand(playerElem);
    this._popup = new Popup(popupElem);
    this._buttons = new Buttons(dealBtnElem, resetBtnElem, hitBtnElem, standBtnElem);

    this._cardSupplier = new CardSupplier(this._dealer, this._deck, this._player);

    this._buttons.deal.attachHandler(() => {
      this._deal();
    });
    this._buttons.reset.attachHandler(() => {
      this._reset();
    });
    this._buttons.hit.attachHandler(() => {
      this._hit();
    });
    this._buttons.stand.attachHandler(() => {
      this._stand();
    });

    this._deck.intro().then(() => {
      this._buttons.deal.enable();
    });
  }

  async _deal() {
    this._popup.hide();
    this._buttons.disableAll();
    this._deck.toForeground();

    await this._deck.shuffle();
    await this._deck.shuffle();

    await this._cardSupplier.supplyPlayerWithCard();
    await this._cardSupplier.supplyPlayerWithCard();
    await this._cardSupplier.supplyDealerWithCard();
    await this._cardSupplier.supplyDealerWithCard(false);

    this._buttons.reset.enable();

    this._checkForBlackjack();
  }

  async _reset() {
    this._popup.hide();
    this._buttons.disableAll();
    this._deck.toBackground();

    this._cardSupplier.supplyDeckWithCards();

    this._dealer.empty();
    this._player.empty();

    await this._deck.shuffle();
    await this._deck.shuffle();

    this._buttons.deal.enable();
  }

  async _hit() {
    this._buttons.disableAll();

    await this._cardSupplier.supplyPlayerWithCard();

    if (this._player.isBusted()) {
      this._dealer.revealSecondCard();
      this._popup.show(popupMessage.PlayerLost);
      this._buttons.reset.enable();
    } else if (this._player.isCardsLimitReached) this._stand();
    else {
      this._buttons.reset.enable();
      this._buttons.allowHitOrStand();
    }
  }

  async _stand() {
    this._buttons.disableAll();
    this._dealer.revealSecondCard();

    await this._supplyDealerWithCards();

    this._conclude();
  }

  _checkForBlackjack() {
    if (this._player.isBlackjacked() || this._dealer.isBlackjacked()) {
      this._popup.show(popupMessage.Blackjack);
      this._dealer.revealSecondCard();
    } else this._buttons.allowHitOrStand();
  }

  async _supplyDealerWithCards() {
    if (this._dealer.canDrawCard() && !this._dealer.isCardsLimitReached) {
      await this._cardSupplier.supplyDealerWithCard();
      await this._supplyDealerWithCards();
    }
  }

  _conclude() {
    const playerScore = this._player.getValue();
    const dealerScore = this._dealer.getValue();

    let message = popupMessage.PlayerLost;

    if (this._dealer.isBusted() || playerScore > dealerScore) message = popupMessage.PlayerWon;
    else if (playerScore === dealerScore) message = popupMessage.Push;

    this._popup.show(message);
    this._buttons.reset.enable();
  }
}
