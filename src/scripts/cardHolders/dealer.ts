import Hand from './hand';

class Dealer extends Hand {
  canDrawCard() {
    return this.getScore() < 17;
  }
}

export default Dealer;
