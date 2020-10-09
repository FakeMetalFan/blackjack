import { CardStack } from '@scripts/card-stack';

import { Card } from '@scripts/Card';

import { rank, suit } from '@scripts/const';

describe('CardStack', () => {
  let elem;
  let cardStack;
  let card;

  beforeEach(() => {
    elem = document.createElement('div');
    cardStack = new CardStack(elem);
    card = new Card(rank.Ace, suit.Spades);
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

  it('should return topCard card reference', () => {
    cardStack.push(card);

    expect(cardStack.topCard).toEqual(card);
  });
});
