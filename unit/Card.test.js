import { Card } from '@scripts/Card';

import { rank, suit } from '@scripts/const';

describe('Card', () => {
  const [x, y, z] = [1, 2, 3];

  let card;

  const getClassName = () => card.elem.className;
  const getStyle = () => card.elem.style;
  const isFaceUp = () => getClassName() === 'card ace-of-spades';
  const isFaceDown = () => getClassName() === 'card back';

  beforeEach(() => {
    card = new Card(rank.Ace, suit.Spades, x, y, z);
  });

  it('should have rank', () => {
    expect(card.rank).toBe(rank.Ace);
  });

  it('should set position on init', () => {
    expect(getStyle().transform).toBe(`translate(${x}px, ${y}px)`);
  });

  it('should set foreground on init', () => {
    expect(getStyle().zIndex).toBe(z + '');
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

  it('should return position', () => {
    expect(card.getPosition()).toEqual(expect.any(Object));
  });

  it('should set position', () => {
    const offset = .25;

    card.setPosition(offset, offset);

    expect(getStyle().transform).toBe(`translate(${offset}px, ${offset}px)`);
  });

  it('should return element width', () => {
    const width = 77.5;

    getStyle().width = `${width}px`;

    expect(card.getWidth()).toBe(width);
  });

  it('should set foreground', () => {
    card.foreground = 1;

    expect(getStyle().zIndex).toBe('1');
  });
});
