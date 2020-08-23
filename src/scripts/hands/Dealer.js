import { Hand } from './internals/Hand';

const MAX_SCORE = 17;

export class Dealer extends Hand {
  constructor() {
    super(document.getElementById('dealer'));
  }

  revealSecondCard() {
    this.cardStack.cards[1].show();
  }

  canDrawCard() {
    return this.cardStack.getValue() < MAX_SCORE;
  }
}
