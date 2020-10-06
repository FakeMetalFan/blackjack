import { Deck } from '@scripts/card-stack';

import { ranks, suits } from '@scripts/const';

jest.mock('@scripts/utils/animation-runner', () => ({
  runAnimations: animations => {
    animations.forEach(({ onStart, onProgress, onEnd }) => {
      onStart?.();
      onProgress?.(.996);
      onEnd?.();
    });
  },
}));

describe('Deck', () => {
  let elem;
  let deck;

  beforeEach(() => {
    elem = document.createElement('div');
    deck = new Deck(elem, ranks, suits);
  });

  it('should create deck', () => {
    expect(elem.childElementCount).toBe(52);
  });

  it('should shuffle cards', () => {
    const getCardStyle = elem => elem.style;
    const getCardsPositions = () => deck.cards.map(({ elem }) => getCardStyle(elem).transform);

    const initialCardsPositions = getCardsPositions();
    const initialCardsForegrounds = deck.cards.map(({ elem }) => getCardStyle(elem).zIndex);

    deck.shuffle();

    expect(initialCardsPositions).not.toEqual(getCardsPositions());
    expect(initialCardsForegrounds).not.toEqual(Array.from(elem.children).map(elem => getCardStyle(elem).zIndex));
  });

  it('should put container element to foreground', () => {
    deck.toForeground();

    expect(elem.style.zIndex).toBe('1');
  });

  it('should put container element to background', () => {
    deck.toBackground();

    expect(elem.style.zIndex).toBe('-1');
  });

  it('should return cards top position', () => {
    expect(deck.getTopPosition()).toEqual(expect.any(Object));
  });
});