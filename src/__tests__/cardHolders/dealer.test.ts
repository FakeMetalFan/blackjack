import Card from 'card';
import Dealer from 'cardHolders/dealer';
import Rank from 'constants/ranks';
import Suit from 'constants/suits';

describe('Dealer', () => {
  it('should indicate ability to draw', () => {
    const dealer = new Dealer(document.createElement('div'));
    const card = new Card(Rank.Four, Suit.Spades);

    expect(
      dealer.push(card).push(card).push(card).push(card).canDrawCard()
    ).toBe(true);
    expect(dealer.push(card).canDrawCard()).toBe(false);
  });
});
