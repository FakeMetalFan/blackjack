import Card from '../src/scripts/card';
import Rank from '../src/scripts/constants/ranks';
import Suit from '../src/scripts/constants/suits';

describe('Card', () => {
  const index = 1;

  let card: Card;

  const getClassName = () => card.elem.className;

  const getStyle = () => card.elem.style;

  const isFaceUp = () => getClassName() === 'card ace-of-spades';

  const isFaceDown = () => getClassName() === 'card back';

  beforeEach(() => {
    card = new Card(Rank.Ace, Suit.Spades, index);
  });

  it('should have rank', () => {
    expect(card.rank).toBe(Rank.Ace);
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
    card.hide().show();

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
    const offset = 0.25;

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
