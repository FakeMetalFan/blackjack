import { rankValue } from 'constants/ranks';
import animate from 'utils/animate';
import createAnimation from 'utils/createAnimation';
import getAnimationStep from 'utils/getAnimationStep';

import CardStack from './cardStack';

const TOP_SCORE = 21;

class Hand extends CardStack {
  async drag(shouldShowFace?: boolean) {
    const { x, y } = this.topCard.getTransform();
    const dx =
      (this.count === 3 ? 0 : this.count - 3) * this.topCard.getRect().width;

    await animate([
      createAnimation({
        duration: 400,
        onProgress: (pr) => {
          this.topCard.setTransform(
            getAnimationStep(x, dx, pr),
            getAnimationStep(y, 0, pr)
          );
        },
        onEnd: () => {
          if (shouldShowFace) {
            this.topCard.show();
          }
        },
      }),
    ]);
  }

  empty() {
    this.cards = [];

    return this;
  }

  getScore() {
    return this.cards.reduce(
      (acc, { rank }, index) => acc + rankValue.get(rank)(acc, index),
      0
    );
  }

  hasBlackjack() {
    return this.getScore() === TOP_SCORE && this.count === 2;
  }

  hasBust() {
    return this.getScore() > TOP_SCORE;
  }

  get hasCardsLimit() {
    return this.count === 5;
  }
}

export default Hand;
