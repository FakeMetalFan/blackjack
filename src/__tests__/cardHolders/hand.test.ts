import { screen } from '@testing-library/dom';
import * as animate from 'animate';
import Card from 'card';
import Hand from 'cardHolders/hand';
import Rank from 'constants/ranks';
import Suit from 'constants/suits';

describe('Hand', () => {
  let hand: Hand;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (animate as any).default = (...animations: animate.AnimationConfig[]) => {
      animations.forEach(({ onStart, onProgress, onEnd }) => {
        onStart?.();
        onProgress?.((from, to) => from + (to - from));
        onEnd?.();
      });
    };
  });

  beforeEach(() => {
    const elem = document.createElement('div');

    elem.setAttribute('data-testid', 'hand');

    document.body.append(elem);

    hand = new Hand(elem);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should drag card', () => {
    const card = new Card(Rank.Ace, Suit.Spades).setTransform(0.25, 0.25);

    hand.push(card).push(card).push(card).dragCard(false);

    expect(card.getTransform()).not.toStrictEqual({ x: 0.25, y: 0.25 });
    expect(card.elem).not.toHaveClass('card ace-of-spades');
  });

  it('should be set active', () => {
    hand.setActive();

    expect(screen.getByTestId('hand')).toHaveClass('active');
  });

  it('should be set inactive', () => {
    hand.setActive();
    hand.setInactive();

    expect(screen.getByTestId('hand')).not.toHaveClass('active');
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
});
