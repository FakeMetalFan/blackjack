import { Deck } from './deck/Deck';
import { suits, ranks, topScore, popupMessage } from './consts';
import { Buttons } from './buttons/Buttons';
import { getAnimation, getAnimationStep } from './utils';
import { Popup } from './Popup';
import { Dealer, Player } from './hands';

export class Blackjack {
  _dealer = new Dealer();
  _deck = new Deck(suits, ranks);
  _player = new Player();
  _buttons = new Buttons();
  _popup = new Popup();

  constructor() {
    this._init();
  }

  async _init() {
    this._attachHandlers();

    await this._deck.intro();

    this._buttons.deal.enable();
  }

  _attachHandlers() {
    const { deal, reset, hit, stand } = this._buttons;

    deal.attachHandler(() => this._deal());
    reset.attachHandler(() => this._reset());
    hit.attachHandler(() => this._hit());
    stand.attachHandler(() => this._stand());
  }

  async _deal() {
    this._popup.hide();
    this._buttons.disableAll();
    this._deck.cardStack.toForeground();

    await this._deck.shuffle();
    await this._deck.shuffle();

    await this._drawCardFromDeck(this._player);
    await this._drawCardFromDeck(this._player);
    await this._drawCardFromDeck(this._dealer);
    await this._drawCardFromDeck(this._dealer, false);

    this._handleBlackjack();
  }

  async _reset() {
    this._popup.hide();
    this._buttons.disableAll();
    this._deck.cardStack.toBackground();

    await Promise.all(this._getResetAnimations());

    this._dealer.cardStack.reset();
    this._player.cardStack.reset();

    await this._deck.shuffle();
    await this._deck.shuffle();

    this._buttons.deal.enable();
  }

  async _hit() {
    this._buttons.disableAll();

    await this._drawCardFromDeck(this._player);

    if (this._player.isBusted()) {
      this._dealer.revealSecondCard();
      this._popup.show(popupMessage.PlayerLost);

      return this._buttons.reset.enable();
    }

    if (this._player.isCardsLimitReached) {
      return await this._stand();
    }

    this._continue();
  }

  async _stand() {
    this._buttons.disableAll();
    this._dealer.revealSecondCard();

    await this._supplyDealerWithCards();

    const playerScore = this._player.cardStack.getValue();
    const dealerScore = this._dealer.cardStack.getValue();

    let message = popupMessage.PlayerLost;

    if (dealerScore > topScore || playerScore > dealerScore) {
      message = popupMessage.PlayerWon;
    } else if (playerScore === dealerScore) {
      message = popupMessage.Push;
    }

    this._popup.show(message);
    this._buttons.reset.enable();
  }

  async _drawCardFromDeck(hand, shouldShowFace = true) {
    const card = this._deck.cardStack.pop();

    if (!card) {
      return;
    }

    const { x: dx, y } = hand.cardStack.getTopPosition(card.getWidth());

    await this._moveCard({
      card,
      dx,
      dy: y - this._deck.cardStack.rect.y,
      onComplete: () => {
        card.setPosition(dx, 0);
        shouldShowFace && card.show();

        hand.cardStack.push(card);
      },
    });
  }

  async _moveCard({ card, dx, dy, onComplete }) {
    const { x, y } = card.getPosition();

    await getAnimation({
      onComplete,
      duration: 300,
      onProgress: dt => card.setPosition(
        getAnimationStep(x, dx, dt),
        getAnimationStep(y, dy, dt)
      ),
    });
  }

  _handleBlackjack() {
    const isPlayerBlackjacked = this._player.isBlackjacked();
    const isDealerBlackjacked = this._dealer.isBlackjacked();

    if (isPlayerBlackjacked && isDealerBlackjacked) {
      this._popup.show(popupMessage.Push);
    }
    if (isPlayerBlackjacked) {
      this._popup.show(popupMessage.PlayerBlackjack);
    }
    if (isDealerBlackjacked) {
      this._popup.show(popupMessage.DealerBlackjack);
    }

    this._buttons.reset.enable();

    if (isPlayerBlackjacked || isDealerBlackjacked) {
      return this._dealer.revealSecondCard();
    }

    this._continue();
  }

  _continue() {
    const { hit, stand } = this._buttons;

    hit.enable();
    stand.enable();
  }

  _getResetAnimations() {
    const { count, cards } = this._player.cardStack;

    return [
      ...cards.map((card, index) => this._moveCardToDeck(card, this._player, index)),
      ...this._dealer.cardStack.cards.map((card, index) => this._moveCardToDeck(card, this._dealer, count + index)),
    ];
  }

  async _moveCardToDeck(card, hand, index) {
    card.hide();

    const z = this._deck.cardStack.count + index;

    card.foreground = z;

    const { x, y } = this._deck.cardStack.getTopPosition();
    const offset = (index + 1) / 4;

    await this._moveCard({
      card,
      dx: x - hand.cardStack.rect.x - offset,
      dy: y - hand.cardStack.rect.y - offset,
      onComplete: () => {
        const offsetAhead = -z / 4;

        card.setPosition(offsetAhead, offsetAhead);

        this._deck.cardStack.push(card);
      },
    });
  }

  async _supplyDealerWithCards() {
    if (this._dealer.canDrawCard() && !this._dealer.isCardsLimitReached) {
      await this._drawCardFromDeck(this._dealer);
      await this._supplyDealerWithCards();
    }
  }
}
