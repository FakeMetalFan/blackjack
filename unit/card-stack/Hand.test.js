import { Hand } from '@scripts/card-stack';

import { Card } from '@scripts/Card';

import { rank, suit } from '@scripts/const';

describe('Hand', () => {
  let hand;

  beforeEach(() => {
    hand = new Hand(document.createElement('div'));
  });

  it('should empty stack', () => {
    hand.push(new Card(rank.Ace, suit.Spades));
    hand.empty();

    expect(hand.count).toBe(0);
  });

  it('should return top position', () => {
    jest.spyOn(hand, 'rect', 'get').mockReturnValue({ x: 0, y: 0 });

    const cardWidth = 77.5;

    expect(hand.getTopPosition(cardWidth)).toEqual({ x: -2 * cardWidth, y: 0 });

    jest.spyOn(hand, 'count', 'get').mockReturnValue(2);

    expect(hand.getTopPosition(cardWidth)).toEqual({ x: 0, y: 0 });
  });

  it('should return cards value', () => {
    const card = new Card(rank.Ace, suit.Spades);

    hand.push(card);
    hand.push(card);

    expect(hand.getValue()).toEqual(12);
  });

  it('should indicate if hand has got a blackjack', () => {
    hand.push(new Card(rank.Ace, suit.Spades));

    expect(hand.isBlackjacked()).toBe(false);

    hand.push(new Card(rank.Jack, suit.Clubs));

    expect(hand.isBlackjacked()).toBe(true);
  });

  it('should indicate if hand is busted', () => {
    const ace = new Card(rank.Ace, suit.Spades);

    hand.push(ace);
    hand.push(new Card(rank.Jack, suit.Clubs));

    expect(hand.isBusted()).toBe(false);

    hand.push(ace);

    expect(hand.isBusted()).toBe(true);
  });

  it('should indicate if cards limit has been reached', () => {
    const card = new Card(rank.Ace, suit.Spades);

    hand.push(card);
    hand.push(card);
    hand.push(card);
    hand.push(card);

    expect(hand.isCardsLimitReached).toBe(false);

    hand.push(card);

    expect(hand.isCardsLimitReached).toBe(true);
  });
});
