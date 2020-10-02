import { Dealer } from '@scripts/hand';

import { Card } from '@scripts/deck';

import { rank, suit } from '@scripts/const';

describe('Dealer', () => {
  let dealer;

  beforeEach(() => {
    dealer = new Dealer(document.createElement('div'));
  });

  it('should reveal second card', () => {
    dealer.cardStack.push(new Card(rank.Jack, suit.Diamonds));

    const secondCard = new Card(rank.Ace, suit.Spades);

    secondCard.hide();

    dealer.cardStack.push(secondCard);
    dealer.revealSecondCard();

    expect(secondCard.elem.className).toBe('card ace-of-spades');
  });

  it('should indicate ability to draw', () => {
    expect(dealer.canDrawCard()).toBe(true);

    dealer.cardStack.push(new Card(rank.Ace, suit.Spades));

    expect(dealer.canDrawCard()).toBe(true);

    dealer.cardStack.push(new Card(rank.Two, suit.Clubs));

    expect(dealer.canDrawCard()).toBe(true);

    dealer.cardStack.push(new Card(rank.Three, suit.Hearts));

    expect(dealer.canDrawCard()).toBe(true);

    dealer.cardStack.push(new Card(rank.Four, suit.Diamonds));

    expect(dealer.canDrawCard()).toBe(false);
  });
});
