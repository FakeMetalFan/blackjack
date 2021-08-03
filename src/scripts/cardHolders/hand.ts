import { rankValue } from 'constants/ranks';
import animate from 'utils/animate';
import createAnimation from 'utils/createAnimation';
import getAnimationStep from 'utils/getAnimationStep';

import CardStack from './cardStack';

const TOP_SCORE = 21;

class Hand extends CardStack {
  constructor(elem: HTMLDivElement, public name: string, protected deg = 0) {
    super(elem);
  }

  async drag(shouldShowFace?: boolean) {
    const { x, y } = this.topCard.getTransform();

    await animate([
      createAnimation({
        duration: 400,
        onStart: () => {
          if (shouldShowFace) {
            this.topCard.show();
          }
        },
        onProgress: (pr) => {
          this.topCard.setTransform(
            getAnimationStep(x, this.getCardOffsetX(), pr),
            getAnimationStep(y, this.getCardOffsetY(), pr),
            getAnimationStep(0, this.deg, pr)
          );
        },
        onEnd: () => {
          this.topCard.toggleClass('dealt').foreground = this.count;
        },
      }),
    ]);
  }

  setActive() {
    this.classList.add('active');
  }

  setInactive() {
    this.classList.remove('active');
  }

  empty() {
    this.cards = [];

    return this;
  }

  getScore() {
    return this.cards.reduce(
      (score, { rank }, index) => score + rankValue.get(rank)(score, index),
      0
    );
  }

  hasBlackjack() {
    return this.getScore() === TOP_SCORE && this.count === 2;
  }

  hasBust() {
    return this.getScore() > TOP_SCORE;
  }

  private getCardOffsetX() {
    switch (this.deg) {
      case -45:
        return 0;
      case -90:
        return -this.cardOffset;
      default:
        return this.cardOffset;
    }
  }

  private getCardOffsetY() {
    switch (this.deg) {
      case 45:
        return 0;
      case 0:
      case -45:
      case -90:
        return -this.cardOffset;
      default:
        return this.cardOffset;
    }
  }

  get hasCardsLimit() {
    return this.count === 5;
  }

  private get cardOffset() {
    return -(this.count - 1) * 15;
  }

  private get classList() {
    return this.elem.classList;
  }
}

export default Hand;
