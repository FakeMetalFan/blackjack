import { CardStack } from './CardStack';

import { rankValue } from '../const';

import { getAnimationStep, runAnimations } from '../utils';

import { Animation } from '../Animation';

const TOP_SCORE = 21;

export class Hand extends CardStack {
  async drag(shouldShowFace) {
    const { x, y } = this.topCard.getTransform();
    const dx = (this.count === 3 ? 0 : this.count - 3) * this.topCard.getRect().width;

    await runAnimations([
      new Animation({
        duration: 300,
        onProgress: pr => {
          this.topCard.setTransform(getAnimationStep(x, dx, pr), getAnimationStep(y, 0, pr));
        },
        onEnd: () => {
          shouldShowFace && this.topCard.show();
        },
      }),
    ]);
  }

  empty() {
    this.cards = [];
  }

  getScore() {
    return this.cards.reduce((acc, { rank }, index) => acc + rankValue.get(rank)(acc, index), 0);
  }

  isBlackjacked() {
    return this.getScore() === TOP_SCORE && this.count === 2;
  }

  isBusted() {
    return this.getScore() > TOP_SCORE;
  }

  get isCardsLimitReached() {
    return this.count === 5;
  }
}
