import animate from 'animate';
import { rankValue } from 'constants/ranks';

import Cards from './cards';

const TOP_SCORE = 21;

class Hand extends Cards {
  async dragCard(shouldShowFace?: boolean) {
    const { x, y } = this.topCard.getTransform();
    const offset = (1 - this.count) * 10;

    await animate({
      duration: 400,
      onStart: () => {
        if (shouldShowFace) {
          this.topCard.show();
        }
      },
      onProgress: (calc) => {
        this.topCard.setTransform(calc(x, offset), calc(y, offset));
      },
      onEnd: () => {
        this.topCard.toggleClass('dealt').foreground = this.count;
      },
    });
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

  private get classList() {
    return this.elem.classList;
  }
}

export default Hand;
