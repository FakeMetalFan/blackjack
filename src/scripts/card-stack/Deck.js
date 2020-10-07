import { CardStack } from './CardStack';

import { Card } from '../Card';

import { getAnimationStep, runAnimations } from '../utils';

import { Animation } from '../Animation';

export class Deck extends CardStack {
  constructor(
    elem,
    suits,
    ranks,
  ) {
    super(elem);

    suits.forEach(suit => {
      ranks.forEach(rank => {
        this.push(new Card(rank, suit, this.count));
      });
    });
  }

  async intro() {
    this.cards.forEach((card, index) => {
      const offset = -index / 4;

      card.show();
      card.setPosition(offset, -200 + offset);
      card.opacity = 0;
    });

    await runAnimations(this.cards.map((card, index) => {
      const { x, y } = card.getPosition();

      const offset = -index / 4;

      return new Animation({
        delay: index * 8,
        duration: 600,
        onProgress: pr => {
          card.setPosition(getAnimationStep(x, offset, pr), getAnimationStep(y, offset, pr));
          card.opacity = getAnimationStep(0, 1, pr);
        },
        onEnd: () => {
          card.hide();
        },
      });
    }));
  }

  async shuffle() {
    for (let i = this.count - 1; i; i--) {
      const j = Math.random() * (i + 1) | 0;

      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }

    await runAnimations(this.cards.reduce((acc, card, index) => {
      const delay = index * 2;
      const duration = 200;

      const { x, y } = card.getPosition();

      const randomOffset = (Math.round(Math.random()) * 2 - 1) * (Math.random() * card.getWidth() / 2 + 30);
      const offset = -index / 4;

      acc.push(
        new Animation({
          delay,
          duration,
          onProgress: pr => {
            card.setPosition(getAnimationStep(x, randomOffset, pr), getAnimationStep(y, offset, pr));
          },
        }),
        new Animation({
          duration,
          delay: delay + duration,
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

  toForeground() {
    this._style.zIndex = '1';
  }

  toBackground() {
    this._style.zIndex = '-1';
  }

  getTopPosition() {
    const { x, y } = this.rect;
    const { x: dx, y: dy } = this.top.getPosition();

    return { x: x + dx, y: y + dy };
  }

  get _style() {
    return this._elem.style;
  }
}
