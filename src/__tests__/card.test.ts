import Card from 'card';
import Rank from 'constants/ranks';
import Suit from 'constants/suits';

describe('Card', () => {
  const card = new Card(Rank.Ace, Suit.Spades, 1);

  it('should have rank', () => {
    expect(card.rank).toBe(Rank.Ace);
  });

  it('should set position on init', () => {
    expect(card.elem.style.transform).toBe('translate(-0.25px, -0.25px)');
  });

  it('should set foreground on init', () => {
    expect(card.elem.style.zIndex).toBe('1');
  });

  it('should have class name', () => {
    expect(card.elem).toHaveClass('card back');
  });

  it('should show face', () => {
    card.hide().show();

    expect(card.elem).toHaveClass('card ace-of-spades');
  });

  it('should hide face', () => {
    card.hide();

    expect(card.elem).toHaveClass('card back');
  });

  it(`should return transform's value`, () => {
    expect(card.getTransform()).toStrictEqual(expect.any(Object));
  });

  it(`should set transform's value`, () => {
    card.setTransform(1, 1);

    expect(card.elem.style.transform).toBe('translate(1px, 1px)');
  });

  it(`should return element's rect`, () => {
    expect(card.getRect()).toStrictEqual(expect.any(Object));
  });

  it('should set foreground', () => {
    card.foreground = 1;

    expect(card.elem.style.zIndex).toBe('1');
  });

  it('should set opacity', () => {
    card.opacity = 1;

    expect(card.elem.style.opacity).toBe('1');
  });
});
