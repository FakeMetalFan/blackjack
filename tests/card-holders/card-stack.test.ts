import Card from '../../src/scripts/card';
import CardStack from '../../src/scripts/card-holders/card-stack';
import Rank from '../../src/scripts/constants/ranks';
import Suit from '../../src/scripts/constants/suits';

describe('CardStack', () => {
  let elem: HTMLDivElement;
  let cardStack: CardStackMock;
  let card: Card;

  class CardStackMock extends CardStack {}

  beforeEach(() => {
    elem = document.createElement('div');
    cardStack = new CardStackMock(elem);
    card = new Card(Rank.Ace, Suit.Spades, 0);
  });

  it('should push card to stack', () => {
    cardStack.push(card);

    expect(cardStack.count).toBe(1);
    expect(elem.children[0]).toBeDefined();
  });

  it('should pop card from stack', () => {
    cardStack.push(card);

    expect(cardStack.pop()).toEqual(card);
  });

  it('should return cards count', () => {
    cardStack.push(card);

    expect(cardStack.count).toBe(1);
  });

  it(`should return element's rect`, () => {
    const spy = jest.spyOn(Element.prototype, 'getBoundingClientRect');

    expect(cardStack.getRect()).toEqual(expect.any(Object));
    expect(spy).toHaveBeenCalled();
  });

  it(`should return top card's reference`, () => {
    cardStack.push(card);

    expect(cardStack.topCard).toEqual(card);
  });
});
