import {
  RANK_VALUE,
} from 'constants/rank';

import animate from 'utils/animate';

import CardStack from './card-stack';

const TOP_SCORE = 21;

export default class extends CardStack {
  dragCard = async (showFace?: boolean) => {
    const {
      x,
      y,
    } = this.peek.getPoint();
    const dx = (this.size - 3) * this.peek.getRect().width;

    await animate({
      duration: 400,
      onStart: () => {
        this.peek.setForeground(this.size);

        if (showFace) {
          this.peek.show();
        }
      },
      onProgress: (calc) => {
        this.peek.setPoint(calc(x, dx), calc(y, 0));
      },
    });
  };

  empty = () => {
    this.items = [];
  };

  getScore = () => {
    return this.items.reduce(
      (acc, card, index) => acc + RANK_VALUE.get(card.rank)(acc, index),
      0
    );
  };

  blackjacked = () => this.size === 2 && this.getScore() === TOP_SCORE;

  busted = () => this.getScore() > TOP_SCORE;

  get enoughCards() {
    return this.size >= 5;
  };
}
