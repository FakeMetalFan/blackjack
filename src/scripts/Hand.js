import { HandCardStack } from './CardStack';

export const topScore = 21;

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
