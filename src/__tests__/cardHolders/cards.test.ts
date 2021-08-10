import Card from 'card';
import Cards from 'cardHolders/cards';
import Rank from 'constants/ranks';
import Suit from 'constants/suits';

describe('Cards', () => {
  let cardStack: CardStackMock;

  class CardStackMock extends Cards {}

  beforeEach(() => {
    cardStack = new CardStackMock(document.createElement('div'));
  });

  it('should push card', () => {
    cardStack.push(new Card(Rank.Ace, Suit.Spades));

    expect(cardStack.count).toBe(1);
  });

  it('should pop card', () => {
    const card = new Card(Rank.Ace, Suit.Spades);

    expect(cardStack.push(card).pop()).toStrictEqual(card);
  });

  it('should return cards count', () => {
    expect(cardStack.push(new Card(Rank.Ace, Suit.Spades)).count).toBe(1);
  });

  it(`should return rect`, () => {
    expect(cardStack.getRect()).toStrictEqual(expect.any(Object));
  });

  it(`should return top card ref`, () => {
    const card = new Card(Rank.Ace, Suit.Spades);

    expect(cardStack.push(card).topCard).toStrictEqual(card);
  });
});
