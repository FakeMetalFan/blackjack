import Card from '../../src/scripts/card';
import Dealer from '../../src/scripts/card-holders/dealer';
import Rank from '../../src/scripts/constants/ranks';
import Suit from '../../src/scripts/constants/suits';

describe('Dealer', () => {
  let dealer: Dealer;

  beforeEach(() => {
    dealer = new Dealer(document.createElement('div'));
  });

  it('should top card', () => {
    dealer.push(new Card(Rank.Jack, Suit.Diamonds, 0));

    const secondCard = new Card(Rank.Ace, Suit.Spades, 0);

    secondCard.hide();
    dealer.push(secondCard).revealTopCard();

    expect(secondCard.elem.className).toBe('card ace-of-spades');
  });

  it('should indicate ability to draw', () => {
    const card = new Card(Rank.Four, Suit.Spades, 0);

    dealer.push(card).push(card).push(card).push(card);

    expect(dealer.canDrawCard()).toBe(true);

    dealer.push(card);

    expect(dealer.canDrawCard()).toBe(false);
  });
});
