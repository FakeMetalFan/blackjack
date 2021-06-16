import { screen } from '@testing-library/dom';
import Deck from 'cardHolders/deck';
import { ranks } from 'constants/ranks';
import { suits } from 'constants/suits';
import * as animate from 'utils/animate';

describe('Deck', () => {
  let deck: Deck;

  const getCardsTransforms = () =>
    deck.cards.map(({ elem }) => elem.style.transform);

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
    const elem = document.createElement('div');

    elem.setAttribute('data-testid', 'deck');
    document.body.append(elem);
    deck = new Deck(elem, suits, ranks);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should create deck', () => {
    expect(deck.count).toBe(52);
  });

  it('should show intro', () => {
    const transforms = getCardsTransforms();

    deck.intro();

    expect(transforms).not.toStrictEqual(getCardsTransforms());
  });

  it('should shuffle cards', () => {
    const transforms = getCardsTransforms();
    const foregrounds = deck.cards.map(({ elem }) => elem.style.zIndex);

    deck.shuffle();

    expect(transforms).not.toStrictEqual(getCardsTransforms());
    expect(foregrounds).not.toEqual(
      Array.from(screen.getByTestId('deck').children).map(
        (elem) => (elem as HTMLElement).style.zIndex
      )
    );
  });

  it('should return top position', () => {
    expect(deck.getOffsetTop()).toEqual(expect.any(Object));
  });
});
