import { Dealer } from '@scripts/card-stack';

import { Card } from '@scripts/Card';

import { rank, suit } from '@scripts/const';

describe('Dealer', () => {
  let dealer;

  beforeEach(() => {
    dealer = new Dealer(document.createElement('div'));
  });

  it('should reveal second card', () => {
    dealer.push(new Card(rank.Jack, suit.Diamonds));

    const secondCard = new Card(rank.Ace, suit.Spades);

    secondCard.hide();
    dealer.push(secondCard);
    dealer.revealSecondCard();

    expect(secondCard.elem.className).toBe('card ace-of-spades');
  });

  it('should indicate ability to draw', () => {
    const card = new Card(rank.Four, suit.Spades);

    dealer.push(card);
    dealer.push(card);
    dealer.push(card);
    dealer.push(card);

    expect(dealer.canDrawCard()).toBe(true);

    dealer.push(card);

    expect(dealer.canDrawCard()).toBe(false);
  });
});
