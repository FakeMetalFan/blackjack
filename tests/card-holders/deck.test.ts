import Card from '../../src/scripts/card';
import Deck from '../../src/scripts/card-holders/deck';
import { ranks } from '../../src/scripts/constants/ranks';
import { suits } from '../../src/scripts/constants/suits';
import { Animation } from '../../src/scripts/utils/animate';

jest.mock('../../src/scripts/utils/animate', () => ({
  __esModule: true,
  default: (animations: Animation[]) => {
    animations.forEach(({ onStart, onProgress, onEnd }) => {
      onStart?.();
      onProgress?.(0.996);
      onEnd?.();
    });
  },
}));

describe('Deck', () => {
  let deckElem: HTMLDivElement;
  let deck: Deck;

  const getStyle = <T extends HTMLElement>(elem: T) => elem.style;

  const getCardsPositions = () =>
    deck.cards.map(({ elem }) => getStyle(elem).transform);

  beforeEach(() => {
    deckElem = document.createElement('div');
    deck = new Deck(deckElem, suits, ranks);
  });

  it('should create deck', () => {
    expect(deckElem.childElementCount).toBe(52);
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
    const initialCardsForegrounds = deck.cards.map(
      ({ elem }) => getStyle(elem).zIndex
    );

    deck.shuffle();

    expect(initialCardsPositions).not.toEqual(getCardsPositions());
    expect(initialCardsForegrounds).not.toEqual(
      Array.from(deckElem.children).map(
        (elem) => getStyle(elem as HTMLElement).zIndex
      )
    );
  });

  it('should return top position', () => {
    expect(deck.getOffsetTop()).toEqual(expect.any(Object));
  });
});
