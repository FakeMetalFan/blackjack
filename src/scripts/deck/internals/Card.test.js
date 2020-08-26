import { Card } from './Card';
import { rank, suit } from '../../consts';

describe('Card', () => {
  let card;

  const getClassName = () => card.elem.className;
  const getStyle = () => card.elem.style;
  const isFaceUp = () => getClassName() === 'card ace-of-spades';
  const isFaceDown = () => getClassName() === 'card back';

  beforeEach(() => card = new Card(rank.Ace, suit.Spades));

  it('should have rank', () => {
    expect(card.rank).toBe(rank.Ace);
  });

  it('should have class name', () => {
    expect(getClassName()).toBe('card ace-of-spades');
  });

  it('should be hidden by default', () => {
    expect(getStyle().opacity).toBe('0');
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
    const x = .25;
    const y = .25;

    card.setPosition(x, y);

    expect(getStyle().transform).toBe(`translate(${x}px, ${y}px)`);
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

  it('should set opacity', () => {
    card.opacity = .5;

    expect(getStyle().opacity).toBe('0.5');
  });
});
