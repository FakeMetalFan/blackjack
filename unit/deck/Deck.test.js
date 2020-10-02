import { ranks, suits } from '@scripts/const';

import { Deck } from '@scripts/deck';

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

  const getCardStyle = elem => elem.style;
  const getCardsPositions = () => deck.cardStack.cards.map(({ elem }) => getCardStyle(elem).transform);

  beforeEach(() => {
    elem = document.createElement('div');
    deck = new Deck(elem, suits, ranks);
  });

  it('should create deck', () => {
    expect(elem.childElementCount).toBe(52);
  });

  it('should animate shuffle', () => {
    const initialCardsPositions = getCardsPositions();
    const initialCardsForegrounds = deck.cardStack.cards.map(({ elem }) => getCardStyle(elem).zIndex);

    deck.shuffle();

    expect(initialCardsPositions).not.toEqual(getCardsPositions());
    expect(initialCardsForegrounds).not.toEqual(Array.from(elem.children).map(elem => getCardStyle(elem).zIndex));
  });
});
