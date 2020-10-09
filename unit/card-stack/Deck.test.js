import { Deck } from '@scripts/card-stack';

import { ranks, suits } from '@scripts/const';

import { Card } from '@scripts/Card';

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

  const getStyle = elem => elem.style;
  const getCardsPositions = () => deck.cards.map(({ elem }) => getStyle(elem).transform);

  beforeEach(() => {
    elem = document.createElement('div');
    deck = new Deck(elem, ranks, suits);
  });

  it('should create deck', () => {
    expect(elem.childElementCount).toBe(52);
  });

  it('should show intro', () => {
    const showSpy = jest.spyOn(Card.prototype, 'show');
    const hideSpy = jest.spyOn(Card.prototype, 'hide');
    const setPositionSpy = jest.spyOn(Card.prototype, 'setTransform');
    const opacitySpy = jest.spyOn(Card.prototype, 'opacity', 'set');

    deck.intro();

    expect(showSpy).toHaveBeenCalled();
    expect(hideSpy).toHaveBeenCalled();
    expect(setPositionSpy).toHaveBeenCalled();
    expect(opacitySpy).toHaveBeenCalled();
  });

  it('should shuffle cards', () => {
    const initialCardsPositions = getCardsPositions();
    const initialCardsForegrounds = deck.cards.map(({ elem }) => getStyle(elem).zIndex);

    deck.shuffle();

    expect(initialCardsPositions).not.toEqual(getCardsPositions());
    expect(initialCardsForegrounds).not.toEqual(Array.from(elem.children).map(elem => getStyle(elem).zIndex));
  });

  it('should return top position', () => {
    expect(deck.getTopPosition()).toEqual(expect.any(Object));
  });
});
