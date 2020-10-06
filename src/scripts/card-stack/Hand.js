import { CardStack } from './CardStack';

import { rankValueFnMap } from '../const';

const TOP_SCORE = 21;

export class Hand extends CardStack {
  empty() {
    this.cards = [];
  }

  getTopPosition(cardWidth) {
    return { x: (this.count === 2 ? 0 : this.count - 2) * cardWidth, y: this.rect.y };
  }

  getValue() {
    return this.cards.reduce((acc, { rank }, index) => acc + rankValueFnMap.get(rank)(acc, index), 0);
  }

  isBlackjacked() {
    return this.getValue() === TOP_SCORE && this.count === 2;
  }

  isBusted() {
    return this.getValue() > TOP_SCORE;
  }

  get isCardsLimitReached() {
    return this.count === 5;
  }
}