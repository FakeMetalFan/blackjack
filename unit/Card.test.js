import { Card } from '@scripts/Card';

import { rank, suit } from '@scripts/const';

describe('Card', () => {
  const index = 1;

  let card;

  const getClassName = () => card.elem.className;
  const getStyle = () => card.elem.style;
  const isFaceUp = () => getClassName() === 'card ace-of-spades';
  const isFaceDown = () => getClassName() === 'card back';

  beforeEach(() => {
    card = new Card(rank.Ace, suit.Spades, index);
  });

  it('should have rank', () => {
    expect(card.rank).toBe(rank.Ace);
  });

  it('should set position on init', () => {
    const offset = -index / 4;

    expect(getStyle().transform).toBe(`translate(${offset}px, ${offset}px)`);
  });

  it('should set foreground on init', () => {
    expect(getStyle().zIndex).toBe(index + '');
  });

  it('should have class name', () => {
    expect(getClassName()).toBe('card back');
  });

  it('should show face', () => {
    card.hide();
    card.show();

    expect(isFaceUp()).toBe(true);
  });

  it('should hide face', () => {
    card.hide();

    expect(isFaceDown()).toBe(true);
  });

  it(`should return transform's value`, () => {
    expect(card.getTransform()).toEqual(expect.any(Object));
  });

  it(`should set transform's value`, () => {
    const offset = .25;

    card.setTransform(offset, offset);

    expect(getStyle().transform).toBe(`translate(${offset}px, ${offset}px)`);
  });

  it(`should return element's rect`, () => {
    const spy = jest.spyOn(Element.prototype, 'getBoundingClientRect');

    expect(card.getRect()).toEqual(expect.any(Object));
    expect(spy).toHaveBeenCalled();
  });

  it('should set foreground', () => {
    card.foreground = 1;

    expect(getStyle().zIndex).toBe('1');
  });

  it('should set opacity', () => {
    card.opacity = 1;

    expect(getStyle().opacity).toBe('1');
  });
});
