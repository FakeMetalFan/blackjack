import { CardSupplier } from '@scripts/CardSupplier';

import { Dealer, Hand } from '@scripts/hand';

import { Deck } from '@scripts/deck';

import { ranks, suits } from '@scripts/const';

jest.mock('@scripts/utils/animation-runner', () => ({
  runAnimations: animations => {
    animations.forEach(({ onStart, onProgress, onEnd }) => {
      onStart?.();
      onProgress?.(.996);
      onEnd?.();
    });
  },
}));

describe('CardSupplier', () => {
  let cardSupplier;

  let dealerElem;
  let deckElem;
  let playerElem;

  let dealer;
  let deck;
  let player;

  beforeEach(() => {
    const createDiv = () => document.createElement('div');

    dealerElem = createDiv();
    deckElem = createDiv();
    playerElem = createDiv();

    dealer = new Dealer(dealerElem);
    deck = new Deck(deckElem, suits, ranks);
    player = new Hand(playerElem);

    cardSupplier = new CardSupplier(dealer, deck, player);
  });

  it('should supply player with card', () => {
    expect(deckElem.childElementCount).toBe(52);

    cardSupplier.supplyPlayerWithCard();

    expect(deckElem.childElementCount).toBe(51);
    expect(playerElem.childElementCount).toBe(1);
  });

  it('should supply dealer with card', () => {
    expect(deckElem.childElementCount).toBe(52);

    cardSupplier.supplyDealerWithCard();
    cardSupplier.supplyDealerWithCard(false);

    expect(deckElem.childElementCount).toBe(50);
    expect(dealerElem.childElementCount).toBe(2);
    expect(dealerElem.children[1].className).toBe('card back');
  });

  it('should supply deck with cards', () => {
    cardSupplier.supplyPlayerWithCard();
    cardSupplier.supplyDealerWithCard();

    expect(deckElem.childElementCount).toBe(50);
    expect(playerElem.childElementCount).toBe(1);
    expect(dealerElem.childElementCount).toBe(1);

    cardSupplier.supplyDeckWithCards();

    expect(deckElem.childElementCount).toBe(52);
    expect(playerElem.childElementCount).toBe(0);
    expect(dealerElem.childElementCount).toBe(0);
  });
});
