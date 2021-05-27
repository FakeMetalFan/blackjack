import Card from '../../src/scripts/card';
import Hand from '../../src/scripts/card-holders/hand';
import Rank from '../../src/scripts/constants/ranks';
import Suit from '../../src/scripts/constants/suits';
import { Animation } from '../../src/scripts/utils/animate';

jest.mock('../../src/scripts/utils/animate', () => ({
  __esModule: true,
  default: (animations: Animation[]) => {
    animations.forEach(({ onProgress, onEnd }) => {
      onProgress?.(0.996);
      onEnd?.();
    });
  },
}));

describe('Hand', () => {
  let hand: Hand;

  beforeEach(() => {
    hand = new Hand(document.createElement('div'));
  });

  it('should drag card', () => {
    const offset = 0.25;
    const card = new Card(Rank.Ace, Suit.Spades, 0).setTransform(
      offset,
      offset
    );

    jest
      .spyOn(Element.prototype, 'getBoundingClientRect')
      .mockReturnValue({ width: 77.5 } as DOMRect);

    hand.push(card).push(card).push(card).drag(false);

    expect(card.getTransform()).not.toEqual({ x: offset, y: offset });
    expect(card.elem.className).not.toEqual('card ace-of-spades');
  });

  it('should empty stack', () => {
    hand.push(new Card(Rank.Ace, Suit.Spades, 0)).empty();

    expect(hand.count).toBe(0);
  });

  it('should return cards value', () => {
    const card = new Card(Rank.Ace, Suit.Spades, 0);

    hand.push(card).push(card);

    expect(hand.getScore()).toBe(12);
  });

  it('should indicate if hand has got a blackjack', () => {
    hand.push(new Card(Rank.Ace, Suit.Spades, 0));

    expect(hand.hasBlackjack()).toBe(false);

    hand.push(new Card(Rank.Jack, Suit.Clubs, 0));

    expect(hand.hasBlackjack()).toBe(true);
  });

  it('should indicate if hand is busted', () => {
    const ace = new Card(Rank.Ace, Suit.Spades, 0);

    hand.push(ace).push(new Card(Rank.Jack, Suit.Clubs, 0));

    expect(hand.hasBust()).toBe(false);

    hand.push(ace);

    expect(hand.hasBust()).toBe(true);
  });

  it('should indicate if cards limit has been reached', () => {
    const card = new Card(Rank.Ace, Suit.Spades, 0);

    hand.push(card).push(card).push(card).push(card);

    expect(hand.hasCardsLimit).toBe(false);

    hand.push(card);

    expect(hand.hasCardsLimit).toBe(true);
  });
});
