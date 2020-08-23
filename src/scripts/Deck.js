import { Card } from './Card';
import { getAnimation, getAnimationStep, getFontSize } from './utils';
import { DeckCardStack } from './CardStack';

export class Deck {
  cardStack = new DeckCardStack(document.getElementById('deck'));

  constructor(
    suits,
    ranks,
  ) {
    this._init(suits, ranks);
  }

  async intro() {
    await Promise.all(this._getIntroAnimations());
  }

  async shuffle() {
    this.cardStack.shuffle();

    await Promise.all(this._getShuffleAnimations());
  }

  _init(suits, ranks) {
    suits.forEach(suit =>
      ranks.forEach(rank => {
        const card = new Card(rank, suit);

        const { count: z } = this.cardStack;
        const offset = -z / 4;

        const introAnimationOffset = -200;

        card.foreground = z;
        card.setPosition(offset, introAnimationOffset - offset);

        this.cardStack.push(card);
      })
    );
  }

  _getIntroAnimations() {
    return this.cardStack.cards.reduce((acc, card, index) => {
      const duration = 400;
      const delay = 500 + index * 10;

      const { x, y } = card.getPosition();
      const offset = -index / 4;

      acc.push(
        getAnimation({
          duration,
          delay,
          onProgress: dt => card.setPosition(
            getAnimationStep(x, offset, dt),
            getAnimationStep(y, offset, dt)
          ),
        }),
        getAnimation({
          duration,
          delay,
          onProgress: dt => card.setOpacity(getAnimationStep(0, 1, dt)),
          onComplete: () => {
            card.hide();
            card.setOpacity('');
          },
        })
      );

      return acc;
    }, []);
  }

  _getShuffleAnimations() {
    return this.cardStack.cards.reduce((acc, card, index) => {
      const duration = 200;
      const delay = index * 2;

      const { x, y } = card.getPosition();
      const randomOffset = (Math.round(Math.random()) ? 1 : -1)
        * (Math.random() * 40 + 20) * getFontSize() / 16;
      const offset = -index / 4;

      acc.push(
        getAnimation({
          duration,
          delay,
          onProgress: dt => card.setPosition(
            getAnimationStep(x, randomOffset, dt),
            getAnimationStep(y, offset, dt)
          ),
        }),
        getAnimation({
          duration,
          delay: duration + delay,
          onStart: () => card.foreground = index,
          onProgress: dt => card.setPosition(getAnimationStep(randomOffset, offset, dt), offset),
        })
      );

      return acc;
    }, []);
  }
}
