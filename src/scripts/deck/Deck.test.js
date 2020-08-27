import { ranks, suits } from '../consts';
import { Deck } from './Deck';

jest.mock('../utils/animation', () => ({
  getAnimation: ({ onStart, onProgress, onComplete }) => {
    onStart && onStart();
    onProgress && onProgress(.996);
    onComplete && onComplete();
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

  it('should animate intro', () => {
    const initialCardsPositions = getCardsPositions();

    deck.intro();

    expect(getCardsPositions()).not.toEqual(initialCardsPositions);
  });

  it('should animate shuffle', () => {
    const initialCardsPositions = getCardsPositions();
    const initialCardsForegrounds = deck.cardStack.cards.map(({ elem }) => getCardStyle(elem).zIndex);

    deck.shuffle();

    expect(initialCardsPositions).not.toEqual(getCardsPositions());
    expect(initialCardsForegrounds).not.toEqual(
      Array.from(elem.children).map(elem => getCardStyle(elem).zIndex)
    );
  });
});
