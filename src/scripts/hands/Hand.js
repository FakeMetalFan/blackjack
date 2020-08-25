import { HandCardStack } from '../card-stacks';
import { rankValueFnMap } from '../consts';

const TOP_SCORE = 21;

export class Hand {
  cardStack;

  constructor(
    elem
  ) {
    this.cardStack = new HandCardStack(elem);
  }

  getValue() {
    return this.cardStack.cards.reduce((acc, { rank }, index) => acc += rankValueFnMap.get(rank)(acc, index), 0);
  }

  isBlackjacked() {
    return this.getValue() === TOP_SCORE && this.cardStack.count === 2;
  }

  isBusted() {
    return this.getValue() > TOP_SCORE;
  }

  get isCardsLimitReached() {
    return this.cardStack.count === 5;
  }
}
