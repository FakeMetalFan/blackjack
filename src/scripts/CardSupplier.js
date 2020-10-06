import { Animation } from './Animation';

import { runAnimations, getAnimationStep } from './utils';

export class CardSupplier {
  _dealer;
  _deck;
  _player;

  constructor(
    dealer,
    deck,
    player
  ) {
    this._dealer = dealer;
    this._deck = deck;
    this._player = player;
  }

  async supplyPlayerWithCard() {
    await this._dragCardFromDeck(this._player);
  }

  async supplyDealerWithCard(shouldShowFace) {
    await this._dragCardFromDeck(this._dealer, shouldShowFace);
  }

  async supplyDeckWithCards() {
    const { count, cards } = this._player;

    await runAnimations([
      ...cards.map((card, index) => this._getDragCardToDeckAnimation(card, this._player, index)),
      ...this._dealer.cards.map((card, index) => this._getDragCardToDeckAnimation(card, this._dealer, count + index)),
    ]);
  }

  async _dragCardFromDeck(hand, shouldShowFace = true) {
    const card = this._deck.pop();

    const { x: dx, y } = hand.getTopPosition(card.getWidth());

    await runAnimations([
      this._getCardDragAnimation({
        card,
        dx,
        dy: y - this._deck.rect.y,
        onEnd: () => {
          card.setPosition(dx, 0);
          shouldShowFace && card.show();

          hand.push(card);
        },
      }),
    ]);
  }

  _getCardDragAnimation({ card, dx, dy, onEnd }) {
    const { x, y } = card.getPosition();

    return new Animation({
      onEnd,
      duration: 300,
      onProgress: pr => {
        card.setPosition(getAnimationStep(x, dx, pr), getAnimationStep(y, dy, pr));
      },
    });
  }

  _getDragCardToDeckAnimation(card, { rect }, i) {
    card.hide();

    const z = this._deck.count + i;

    card.foreground = z;

    const { x, y } = this._deck.getTopPosition();
    const offset = i / 4;

    return this._getCardDragAnimation({
      card,
      dx: x - rect.x - offset,
      dy: y - rect.y - offset,
      onEnd: () => {
        const insertionOffset = -z / 4;

        card.setPosition(insertionOffset, insertionOffset);

        this._deck.push(card);
      },
    });
  }
}
