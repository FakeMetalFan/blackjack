import Hand from './hand';

class Players {
  public hands: Hand[];

  private currentIndex = 0;

  constructor(...hands: Hand[]) {
    this.hands = hands;
  }

  setNext() {
    this.setInactive();

    this.currentIndex += 1;
  }

  reset() {
    this.currentIndex = 0;
  }

  setInactive() {
    this.hands.forEach((hand) => {
      hand.setInactive();
    });
  }

  haveBlackjack() {
    return this.hands.some((hand) => hand.hasBlackjack());
  }

  haveBust() {
    return !this.hands.some((hand) => !hand.hasBust());
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
