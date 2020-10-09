import { Hand } from '@scripts/card-stack';

import { Card } from '@scripts/Card';

import { rank, suit } from '@scripts/const';

jest.mock('@scripts/utils/animation-runner', () => ({
  runAnimations: animations => {
    animations.forEach(({ onProgress, onEnd }) => {
      onProgress?.(.996);
      onEnd?.();
    });
  },
}));

describe('Hand', () => {
  let hand;

  beforeEach(() => {
    hand = new Hand(document.createElement('div'));
  });

  it('should drag card', () => {
    const offset = .25;
    const card = new Card(rank.Ace, suit.Spades).setTransform(offset, offset);

    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ width: 77.5 });

    hand.push(card).push(card).push(card).drag(false);

    expect(card.getTransform()).not.toEqual({ x: offset, y: offset });
    expect(card.elem.className).not.toEqual('card ace-of-spades');
  });

  it('should empty stack', () => {
    hand.push(new Card(rank.Ace, suit.Spades)).empty();

    expect(hand.count).toBe(0);
  });

  it('should return cards value', () => {
    const card = new Card(rank.Ace, suit.Spades);

    hand.push(card).push(card);

    expect(hand.getScore()).toBe(12);
  });

  it('should indicate if hand has got a blackjack', () => {
    hand.push(new Card(rank.Ace, suit.Spades));

    expect(hand.isBlackjacked()).toBe(false);

    hand.push(new Card(rank.Jack, suit.Clubs));

    expect(hand.isBlackjacked()).toBe(true);
  });

  it('should indicate if hand is busted', () => {
    const ace = new Card(rank.Ace, suit.Spades);

    hand.push(ace).push(new Card(rank.Jack, suit.Clubs));

    expect(hand.isBusted()).toBe(false);

    hand.push(ace);

    expect(hand.isBusted()).toBe(true);
  });

  it('should indicate if cards limit has been reached', () => {
    const card = new Card(rank.Ace, suit.Spades);

    hand.push(card).push(card).push(card).push(card);

    expect(hand.isCardsLimitReached).toBe(false);

    hand.push(card);

    expect(hand.isCardsLimitReached).toBe(true);
  });
});
