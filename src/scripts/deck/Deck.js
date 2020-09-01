import { Card } from './internals/Card';
import { DeckCardStack } from '../card-stacks';
import { getAnimation, runAnimations, getAnimationStep, getFontSize } from '../utils';

const INTRO_OFFSET = -250;

export class Deck {
  cardStack;

  constructor(
    elem,
    suits,
    ranks,
  ) {
    this.cardStack = new DeckCardStack(elem);

    this._init(suits, ranks);
  }

  async intro() {
    await runAnimations(this._getIntroAnimations());
  }

  async shuffle() {
    this.cardStack.shuffle();

    await runAnimations(this._getShuffleAnimations());
  }

  _init(suits, ranks) {
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
      const delay = 500 + index * 10;
      const duration = 600;

      const { x, y } = card.getPosition();
      const offset = -index / 4;

      acc.push(
        getAnimation({
          delay,
          duration,
          onProgress: pr => card.setPosition(getAnimationStep(x, offset, pr), getAnimationStep(y, offset, pr)),
        }),
        getAnimation({
          delay,
          duration,
          onProgress: pr => card.opacity = getAnimationStep(0, 1, pr),
          onEnd: () => {
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
      const delay = index * 2;
      const duration = 200;

      const { x, y } = card.getPosition();
      const randomOffset = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 40 + 20) * getFontSize() / 16;
      const offset = -index / 4;

      acc.push(
        getAnimation({
          delay,
          duration,
          onProgress: pr => card.setPosition(getAnimationStep(x, randomOffset, pr), getAnimationStep(y, offset, pr)),
        }),
        getAnimation({
          duration,
          delay: duration + delay,
          onStart: () => card.foreground = index,
          onProgress: pr => card.setPosition(getAnimationStep(randomOffset, offset, pr), offset),
        })
      );

      return acc;
    }, []);
  }
}
