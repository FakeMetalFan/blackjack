import { HandCardStack } from '@scripts/card-stack';

import { Card } from '@scripts/deck';

import { rank, suit } from '@scripts/const';

describe('HandCardStack', () => {
  let handCardStack;

  beforeEach(() => {
    handCardStack = new HandCardStack(document.createElement('div'));
  });

  it('should empty stack', () => {
    handCardStack.push(new Card(rank.Ace, suit.Spades));
    handCardStack.empty();

    expect(handCardStack.count).toBe(0);
  });

  it('should return top position', () => {
    jest.spyOn(handCardStack, 'rect', 'get').mockReturnValue({ x: 0, y: 0 });

    const cardWidth = 77.5;

    expect(handCardStack.getTopPosition(cardWidth)).toEqual({ x: -2 * cardWidth, y: 0 });

    jest.spyOn(handCardStack, 'count', 'get').mockReturnValue(2);

    expect(handCardStack.getTopPosition(cardWidth)).toEqual({ x: 0, y: 0 });
  });
});
