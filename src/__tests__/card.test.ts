import * as animate from 'animate';
import Card from 'card';
import Rank from 'constants/ranks';
import Suit from 'constants/suits';

describe('Card', () => {
  const card = new Card(Rank.Ace, Suit.Spades, 1);

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (animate as any).default = (...animations: animate.AnimationConfig[]) => {
      animations.forEach((animation) => {
        animation.onProgress?.((from, to) => from + (to - from));
      });
    };
  });

  it('should have rank', () => {
    expect(card.rank).toBe(Rank.Ace);
  });

  it('should set position on init', () => {
    expect(card.elem.style.transform).toBe('translate(-0.25px, -0.25px)');
  });

  it('should set foreground on init', () => {
    expect(card.elem.style.zIndex).toBe('1');
  });

  it('should have classes', () => {
    expect(card.elem).toHaveClass('card');

    const inner = card.elem.firstChild;

    expect(inner).toHaveClass('inner');
    expect(inner.firstChild).toHaveClass('back');
    expect(inner.lastChild).toHaveClass('face ace-of-spades');
  });

  it('should be shown', () => {
    card.show();

    expect((card.elem.firstChild as HTMLElement).style.transform).toBe(
      'rotateY(180deg)'
    );
  });

  it('should be hidden', async () => {
    (await card.show()).hide();

    expect((card.elem.firstChild as HTMLElement).style.transform).toBe(
      'rotateY(0deg)'
    );
  });

  it(`should set transform's value`, () => {
    card.setTransform(1, 1);

    expect(card.elem.style.transform).toBe('translate(1px, 1px)');
  });

  it(`should return transform's value`, () => {
    expect(card.getTransform()).toStrictEqual(expect.any(Object));
  });

  it(`should return element's rect`, () => {
    expect(card.getRect()).toStrictEqual(expect.any(Object));
  });

  it('should toggle class', () => {
    card.toggleClass('class');

    expect(card.elem).toHaveClass('class');

    card.toggleClass('class');

    expect(card.elem).not.toHaveClass('class');
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
