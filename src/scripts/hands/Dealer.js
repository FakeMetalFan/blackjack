import { Hand } from './Hand';

const MAX_SCORE = 17;

export class Dealer extends Hand {
  constructor(elem) {
    super(elem);
  }

  revealSecondCard() {
    this.cardStack.cards[1].show();
  }

  canDrawCard() {
    return this.getValue() < MAX_SCORE;
  }
}
