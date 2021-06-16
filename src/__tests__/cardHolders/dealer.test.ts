import Card from 'card';
import Dealer from 'cardHolders/dealer';
import Rank from 'constants/ranks';
import Suit from 'constants/suits';

describe('Dealer', () => {
  let dealer: Dealer;

  beforeEach(() => {
    dealer = new Dealer(document.createElement('div'));
  });

  it('should reveal top card', () => {
    const topCard = new Card(Rank.Ace, Suit.Spades).hide();

    dealer
      .push(new Card(Rank.Jack, Suit.Diamonds))
      .push(topCard)
      .revealTopCard();

    expect(topCard.elem).toHaveClass('card ace-of-spades');
  });

  it('should indicate ability to draw', () => {
    const card = new Card(Rank.Four, Suit.Spades);

    expect(
      dealer.push(card).push(card).push(card).push(card).canDrawCard()
    ).toBe(true);
    expect(dealer.push(card).canDrawCard()).toBe(false);
  });
});
