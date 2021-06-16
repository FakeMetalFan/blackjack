import Hand from './hand';

class Dealer extends Hand {
  revealTopCard() {
    this.topCard?.show();
  }

  canDrawCard() {
    return this.getScore() < 17;
  }
}

export default Dealer;
