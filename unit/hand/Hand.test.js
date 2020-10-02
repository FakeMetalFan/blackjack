import { Hand } from '@scripts/hand';

import { Card } from '@scripts/deck';

import { rank, suit } from '@scripts/const';

describe('Hand', () => {
  let hand;

  beforeEach(() => {
    hand = new Hand(document.createElement('div'));
  });

  it('should return total cards value', () => {
    hand.cardStack.push(new Card(rank.Ace, suit.Spades));

    expect(hand.getValue()).toEqual(11);

    hand.cardStack.push(new Card(rank.Ace, suit.Clubs));

    expect(hand.getValue()).toEqual(12);
  });

  it('should indicate if hand has got a blackjack', () => {
    hand.cardStack.push(new Card(rank.Ace, suit.Spades));

    expect(hand.isBlackjacked()).toBe(false);

    hand.cardStack.push(new Card(rank.Jack, suit.Clubs));

    expect(hand.isBlackjacked()).toBe(true);
  });

  it('should indicate if hand is busted', () => {
    hand.cardStack.push(new Card(rank.Ace, suit.Spades));

    expect(hand.isBusted()).toBe(false);

    hand.cardStack.push(new Card(rank.Jack, suit.Clubs));

    expect(hand.isBusted()).toBe(false);

    hand.cardStack.push(new Card(rank.Ace, suit.Hearts));

    expect(hand.isBusted()).toBe(true);
  });

  it('should indicate if cards limit has been reached', () => {
    hand.cardStack.push(new Card(rank.Ace, suit.Spades));

    expect(hand.isCardsLimitReached).toBe(false);

    hand.cardStack.push(new Card(rank.Ace, suit.Clubs));

    expect(hand.isCardsLimitReached).toBe(false);

    hand.cardStack.push(new Card(rank.Ace, suit.Hearts));

    expect(hand.isCardsLimitReached).toBe(false);

    hand.cardStack.push(new Card(rank.Ace, suit.Diamonds));

    expect(hand.isCardsLimitReached).toBe(false);

    hand.cardStack.push(new Card(rank.Two, suit.Clubs));

    expect(hand.isCardsLimitReached).toBe(true);
  });
});
