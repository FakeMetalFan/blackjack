import Card from 'card';
import Hand from 'cardHolders/hand';
import Rank from 'constants/ranks';
import Suit from 'constants/suits';
import * as animate from 'utils/animate';

describe('Hand', () => {
  let hand: Hand;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (animate as any).default = (animations: animate.Animation[]) => {
      animations.forEach(({ onStart, onProgress, onEnd }) => {
        onStart?.();
        onProgress?.(0.996);
        onEnd?.();
      });
    };
  });

  beforeEach(() => {
    hand = new Hand(document.createElement('div'));
  });

  it('should drag card', () => {
    const card = new Card(Rank.Ace, Suit.Spades).setTransform(0.25, 0.25);

    hand.push(card).push(card).push(card).drag(false);

    expect(card.getTransform()).not.toStrictEqual({ x: 0.25, y: 0.25 });
    expect(card.elem).not.toHaveClass('card ace-of-spades');
  });

  it('should empty stack', () => {
    expect(hand.push(new Card(Rank.Ace, Suit.Spades)).empty().count).toBe(0);
  });

  it('should return cards value', () => {
    expect(hand.push(new Card(Rank.Ace, Suit.Spades)).getScore()).toBe(11);
  });

  it('should indicate a blackjack', () => {
    expect(hand.push(new Card(Rank.Ace, Suit.Spades)).hasBlackjack()).toBe(
      false
    );
    expect(hand.push(new Card(Rank.Jack, Suit.Clubs)).hasBlackjack()).toBe(
      true
    );
  });

  it('should indicate bust', () => {
    const ace = new Card(Rank.Ace, Suit.Spades);

    expect(hand.push(ace).push(new Card(Rank.Jack, Suit.Clubs)).hasBust()).toBe(
      false
    );
    expect(hand.push(ace).hasBust()).toBe(true);
  });

  it('should indicate cards limit', () => {
    const card = new Card(Rank.Ace, Suit.Spades, 0);

    expect(hand.push(card).push(card).push(card).push(card).hasCardsLimit).toBe(
      false
    );
    expect(hand.push(card).hasCardsLimit).toBe(true);
  });
});
