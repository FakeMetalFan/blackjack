import { Card } from './internals/Card';
import { getAnimation, getAnimationStep, getFontSize } from '../utils';
import { DeckCardStack } from '../card-stacks';

const INTRO_OFFSET = -250;

export class Deck {
  cardStack;

  constructor(
    elem,
    suits,
    ranks,
  ) {
    this._init(elem, suits, ranks);
  }

  async intro() {
    await Promise.all(this._getIntroAnimations());
  }

  async shuffle() {
    this.cardStack.shuffle();

    await Promise.all(this._getShuffleAnimations());
  }

  _init(elem, suits, ranks) {
    this.cardStack = new DeckCardStack(elem);

    suits.forEach(suit =>
      ranks.forEach(rank => {
        const card = new Card(rank, suit);

        const { count: z } = this.cardStack;
        const offset = -z / 4;

        card.foreground = z;
        card.setPosition(offset, INTRO_OFFSET + offset);

        this.cardStack.push(card);
      })
    );
  }

  _getIntroAnimations() {
    return this.cardStack.cards.reduce((acc, card, index) => {
      const duration = 600;
      const delay = 500 + index * 10;

      const { x, y } = card.getPosition();
      const offset = -index / 4;

      acc.push(
        getAnimation({
          duration,
          delay,
          onProgress: dt => card.setPosition(getAnimationStep(x, offset, dt), getAnimationStep(y, offset, dt)),
        }),
        getAnimation({
          duration,
          delay,
          onProgress: dt => card.opacity = getAnimationStep(0, 1, dt),
          onComplete: () => {
            card.hide();
            card.opacity = '';
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
      const randomOffset = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 40 + 20) * getFontSize() / 16;
      const offset = -index / 4;

      acc.push(
        getAnimation({
          duration,
          delay,
          onProgress: dt => card.setPosition(getAnimationStep(x, randomOffset, dt), getAnimationStep(y, offset, dt)),
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
