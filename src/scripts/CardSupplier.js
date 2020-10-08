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

  supplyDeckWithCards() {
    [...this._player.cards, ...this._dealer.cards].forEach(card => {
      const { x, y, width, height } = card.getRect();
      const { x: dx, y: dy } = this._deck.getRect();

      card.hide();
      card.setTransform(x - dx + width / 2, y - dy + height / 2);

      this._deck.push(card);
    });
  }

  async _dragCardFromDeck(hand, shouldShowFace = true) {
    const card = this._deck.pop();

    const { x, y } = card.getTransform();
    const { x: dx, y: handY } = hand.getTopPosition(card.getRect().width);
    const dy = handY - this._deck.getRect().y;

    await runAnimations([
      new Animation({
        duration: 300,
        onProgress: pr => {
          card.setTransform(getAnimationStep(x, dx, pr), getAnimationStep(y, dy, pr));
        },
        onEnd: () => {
          card.setTransform(dx, 0);
          shouldShowFace && card.show();

          hand.push(card);
        },
      }),
    ]);
  }
}
