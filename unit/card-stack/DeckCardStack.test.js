import { DeckCardStack } from '@scripts/card-stack';

import { ranks, suits } from '@scripts/const';

import { Card } from '@scripts/deck';

describe('DeckCardStack', () => {
  let elem;
  let deckCardStack;
  let cards;

  beforeEach(() => {
    elem = document.createElement('div');
    deckCardStack = new DeckCardStack(elem);

    cards = suits.reduce((acc, suit) => {
      ranks.forEach(rank => acc.push(new Card(rank, suit)));

      return acc;
    }, []);

    cards.forEach(card => deckCardStack.push(card));
  });

  it('should shuffle cards in place', () => {
    deckCardStack.shuffle();

    expect(deckCardStack.cards).not.toEqual(cards);
  });

  it('should foreground container element', () => {
    deckCardStack.toForeground();

    expect(elem.style.zIndex).toBe('1');
  });

  it('should background container element', () => {
    deckCardStack.toBackground();

    expect(elem.style.zIndex).toBe('-1');
  });

  it('should return cards top position', () => {
    expect(deckCardStack.getTopPosition()).toEqual(expect.any(Object));
  });
});
