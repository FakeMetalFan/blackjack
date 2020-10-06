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
    const { count, cards } = this._player.cardStack;

    await runAnimations([
      ...cards.map((card, index) => this._getDragCardToDeckAnimation(card, this._player, index)),
      ...this._dealer.cardStack.cards.map(
        (card, index) => this._getDragCardToDeckAnimation(card, this._dealer, count + index)
      ),
    ]);
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

    return new Animation({
      onEnd,
      duration: 300,
      onProgress: pr => {
        card.setPosition(getAnimationStep(x, dx, pr), getAnimationStep(y, dy, pr));
      },
    });
  }

  _getDragCardToDeckAnimation(card, { cardStack: { rect } }, i) {
    card.hide();

    const z = this._deck.cardStack.count + i;

    card.foreground = z;

    const { x, y } = this._deck.cardStack.getTopPosition();
    const offset = i / 4;

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
}
