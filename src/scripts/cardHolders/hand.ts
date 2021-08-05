import { rankValue } from 'constants/ranks';
import animate from 'utils/animate';
import createAnimation from 'utils/createAnimation';
import getAnimationStep from 'utils/getAnimationStep';

import CardStack from './cardStack';

const TOP_SCORE = 21;

class Hand extends CardStack {
  async dragCard(shouldShowFace?: boolean) {
    const { x, y } = this.topCard.getTransform();
    const dx = (1 - this.count) * 15;
    const dy = (1 - this.count) * 2.5;

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
            getAnimationStep(x, dx, pr),
            getAnimationStep(y, dy, pr)
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
      (acc, card, index) => acc + rankValue.get(card.rank)(acc, index),
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

  private get classList() {
    return this.elem.classList;
  }
}

export default Hand;
