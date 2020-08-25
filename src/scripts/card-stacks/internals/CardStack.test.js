import { CardStack } from './CardStack';
import { Card } from '../../deck/internals/Card';
import { rank, suit } from '../../consts';

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

  it(`should return container's element "boundingClientRect"`, () => {
    expect(cardStack.rect).toEqual(expect.any(Object));
  });

  it('should return top card reference', () => {
    cardStack.push(card);

    expect(cardStack.top).toEqual(card);
  });
});
