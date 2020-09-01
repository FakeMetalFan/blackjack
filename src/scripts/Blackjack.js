import { Deck } from './deck/Deck';
import { suits, ranks, popupMessage } from './consts';
import { Buttons } from './buttons/Buttons';
import { Popup } from './Popup';
import { Dealer, Hand } from './hands';
import { getAnimation, runAnimations, getAnimationStep } from './utils';

export class Blackjack {
  _dealer;
  _deck;
  _player;
  _popup;
  _buttons;

  constructor(
    dealerElem,
    deckElem,
    playerElem,
    popupElem,
    buttonsElem,
  ) {
    this._init(dealerElem, deckElem, playerElem, popupElem, buttonsElem);
  }

  async _init(dealerElem, deckElem, playerElem, popupElem, buttonsElem) {
    this._dealer = new Dealer(dealerElem);
    this._deck = new Deck(deckElem, suits, ranks);
    this._player = new Hand(playerElem);
    this._popup = new Popup(popupElem);

    await this._deck.intro();

    this._buttons = new Buttons(buttonsElem);

    this._buttons.deal.attachHandler(() => this._deal());
    this._buttons.reset.attachHandler(() => this._reset());
    this._buttons.hit.attachHandler(() => this._hit());
    this._buttons.stand.attachHandler(() => this._stand());

    this._buttons.disableAll();
    this._buttons.deal.enable();
  }

  async _deal() {
    this._popup.hide();
    this._buttons.disableAll();
    this._deck.cardStack.toForeground();

    await this._deck.shuffle();
    await this._deck.shuffle();

    await this._dragCardFromDeck(this._player);
    await this._dragCardFromDeck(this._player);
    await this._dragCardFromDeck(this._dealer);
    await this._dragCardFromDeck(this._dealer, false);

    this._buttons.reset.enable();

    const isPlayerBlackjacked = this._player.isBlackjacked();
    const isDealerBlackjacked = this._dealer.isBlackjacked();

    if (isPlayerBlackjacked && isDealerBlackjacked) this._popup.show(popupMessage.Push);
    else if (isPlayerBlackjacked) this._popup.show(popupMessage.PlayerBlackjack);
    else if (isDealerBlackjacked) this._popup.show(popupMessage.DealerBlackjack);

    if (isPlayerBlackjacked || isDealerBlackjacked) return this._dealer.revealSecondCard();

    this._buttons.allowHitOrStand();
  }

  async _reset() {
    this._popup.hide();
    this._buttons.disableAll();
    this._deck.cardStack.toBackground();

    await runAnimations(this._getResetAnimations());

    this._dealer.cardStack.empty();
    this._player.cardStack.empty();

    await this._deck.shuffle();
    await this._deck.shuffle();

    this._buttons.deal.enable();
  }

  async _hit() {
    this._buttons.disableAll();

    await this._dragCardFromDeck(this._player);

    if (this._player.isBusted()) {
      this._dealer.revealSecondCard();
      this._popup.show(popupMessage.PlayerLost);

      return this._buttons.reset.enable();
    }

    if (this._player.isCardsLimitReached) return await this._stand();

    this._buttons.reset.enable();
    this._buttons.allowHitOrStand();
  }

  async _stand() {
    this._buttons.disableAll();
    this._dealer.revealSecondCard();

    await this._supplyDealerWithCards();

    const playerScore = this._player.getValue();
    const dealerScore = this._dealer.getValue();

    let message = popupMessage.PlayerLost;

    if (this._dealer.isBusted() || playerScore > dealerScore) message = popupMessage.PlayerWon;
    else if (playerScore === dealerScore) message = popupMessage.Push;

    this._popup.show(message);
    this._buttons.reset.enable();
  }

  async _dragCardFromDeck({ cardStack }, shouldShowFace = true) {
    const card = this._deck.cardStack.pop();

    const { x: dx, y } = cardStack.getTopPosition(card.getWidth());

    await runAnimations([
      this._getCardDragAnimation({
        card,
        dx,
        dy: y - this._deck.cardStack.rect.y,
        onEnd: () => {
          card.setPosition(dx, 0);
          shouldShowFace && card.show();

          cardStack.push(card);
        },
      }),
    ]);
  }

  _getCardDragAnimation({ card, dx, dy, onEnd }) {
    const { x, y } = card.getPosition();

    return getAnimation({
      onEnd,
      duration: 300,
      onProgress: pr => card.setPosition(getAnimationStep(x, dx, pr), getAnimationStep(y, dy, pr)),
    });
  }

  _getResetAnimations() {
    const { count, cards } = this._player.cardStack;

    return [
      ...cards.map((card, index) => this._getDragCardToDeckAnimation(card, this._player, index)),
      ...this._dealer.cardStack.cards.map((card, index) =>
        this._getDragCardToDeckAnimation(card, this._dealer, count + index)),
    ];
  }

  _getDragCardToDeckAnimation(card, { cardStack: { rect } }, index) {
    card.hide();

    const z = this._deck.cardStack.count + index;

    card.foreground = z;

    const { x, y } = this._deck.cardStack.getTopPosition();
    const offset = index / 4;

    return this._getCardDragAnimation({
      card,
      dx: x - rect.x - offset,
      dy: y - rect.y - offset,
      onEnd: () => {
        const insertionOffset = -z / 4;

        card.setPosition(insertionOffset, insertionOffset);

        this._deck.cardStack.push(card);
      },
    });
  }

  async _supplyDealerWithCards() {
    if (this._dealer.canDrawCard() && !this._dealer.isCardsLimitReached) {
      await this._dragCardFromDeck(this._dealer);
      await this._supplyDealerWithCards();
    }
  }
}
