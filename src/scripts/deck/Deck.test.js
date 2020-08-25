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

  const getCardStyle = ({ elem }) => elem.style;

  beforeEach(() => {
    elem = document.createElement('div');
    deck = new Deck(elem, suits, ranks);
  });

  it('should create deck', () => {
    expect(elem.childElementCount).toBe(52);
  });

  it('should animate intro', () => {
    const firstCard = deck.cardStack.cards[0];

    expect(getCardStyle(firstCard).transform).toBe('translate(0px, -250px)');

    deck.intro();

    expect(getCardStyle(firstCard).transform).toBe('translate(0px, 0px)');
  });

  it('should animate shuffle', () => {
    const firstCard = deck.cardStack.cards[0];

    firstCard.setPosition(0, 0); // flushing intro;

    const z = '0';
    const translate = 'translate(0px, 0px)';

    expect(getCardStyle(firstCard).zIndex).toBe(z);
    expect(getCardStyle(firstCard).transform).toBe(translate);

    deck.shuffle();

    expect(getCardStyle(firstCard).zIndex).not.toBe(z);
    expect(getCardStyle(firstCard).translate).not.toBe(translate);
  });
});
