import Hand from './hand';

class Players {
  private currentIndex = 0;

  constructor(public hands: Hand[]) {}

  setNext() {
    this.setInactive();
    this.currentIndex += 1;
  }

  resetCurrent() {
    this.currentIndex = 0;
  }

  setInactive() {
    this.hands.forEach((hand) => {
      hand.setInactive();
    });
  }

  empty() {
    this.hands.forEach((hand) => {
      hand.empty();
    });
  }

  haveBlackjack() {
    return this.hands.some((hand) => hand.hasBlackjack());
  }

  getTopScore() {
    return this.hands.reduce((acc, hand) => {
      if (hand.hasBust()) {
        return acc;
      }

      const score = hand.getScore();

      return score > acc ? score : acc;
    }, 0);
  }

  get current() {
    return this.hands[this.currentIndex];
  }
}

export default Players;
