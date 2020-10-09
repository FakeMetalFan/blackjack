import { Hand } from './Hand';

export class Dealer extends Hand {
  revealSecondCard() {
    this.cards[1].show();
  }

  canDrawCard() {
    return this.getScore() < 17;
  }
}
