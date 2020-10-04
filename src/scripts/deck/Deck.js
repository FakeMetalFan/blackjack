import { DeckCardStack } from '@card-stack';

import { getAnimation, runAnimations, getAnimationStep, getFontSize } from '@utils';

import { Card } from './Card';

export class Deck {
  cardStack;

  constructor(
    elem,
    suits,
    ranks,
  ) {
    this.cardStack = new DeckCardStack(elem);

    suits.forEach(suit => {
      ranks.forEach(rank => {
        const { count: z } = this.cardStack;
        const offset = -z / 4;

        this.cardStack.push(new Card(rank, suit, offset, offset, z));
      });
    });
  }

  async shuffle() {
    this.cardStack.shuffle();

    await runAnimations(this.cardStack.cards.reduce((acc, card, index) => {
      const delay = index * 2;
      const duration = 200;

      const { x, y } = card.getPosition();
      const randomOffset = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 40 + 20) * getFontSize() / 16;
      const offset = -index / 4;

      acc.push(
        getAnimation({
          delay,
          duration,
          onProgress: pr => {
            card.setPosition(getAnimationStep(x, randomOffset, pr), getAnimationStep(y, offset, pr));
          },
        }),
        getAnimation({
          duration,
          delay: duration + delay,
          onStart: () => {
            card.foreground = index;
          },
          onProgress: pr => {
            card.setPosition(getAnimationStep(randomOffset, offset, pr), offset);
          },
        })
      );

      return acc;
    }, []));
  }
}
