import { CardStack } from './CardStack';

import { Card } from '../Card';

import { getAnimationStep, getFontSize, runAnimations } from '../utils';

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
        const offset = -this.count / 4;

        this.push(new Card(rank, suit, offset, offset, this.count));
      });
    });
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
      const randomOffset = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 40 + 20) * getFontSize() / 16;
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
