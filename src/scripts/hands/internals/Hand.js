import { HandCardStack } from '../../card-stacks';
import { topScore } from '../../consts';

export class Hand {
  cardStack;

  constructor(
    elem
  ) {
    this.cardStack = new HandCardStack(elem);
  }

  isBlackjacked() {
    return this.cardStack.getValue() === topScore && this.cardStack.count === 2;
  }

  isBusted() {
    return this.cardStack.getValue() > topScore;
  }

  get isCardsLimitReached() {
    return this.cardStack.count === 5;
  }
}
