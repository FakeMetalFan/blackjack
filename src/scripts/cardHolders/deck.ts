import animate, { AnimationConfig } from 'animate';
import Card from 'card';
import Rank from 'constants/ranks';
import Suit from 'constants/suits';

import CardStack from './cardStack';

class Deck extends CardStack {
  constructor(elem: HTMLDivElement, suits: Suit[], ranks: Rank[]) {
    super(elem);

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        const offset = -this.count / 4;
        const card = new Card(rank, suit, this.count).setTransform(
          offset,
          -200 + offset
        );

        card.opacity = 0;

        this.push(card);
      });
    });
  }

  async intro() {
    await animate(
      ...this.cards.map((card, index) => {
        const { x, y } = card.getTransform();
        const offset = -index / 4;

        return {
          delay: index * 8,
          duration: 600,
          onProgress(calc) {
            /* eslint-disable no-param-reassign */
            card.setTransform(calc(x, offset), calc(y, offset)).opacity = calc(
              0,
              1
            );
          },
        } as AnimationConfig;
      })
    );
  }

  async shuffle() {
    for (let lastIndex = this.count - 1; lastIndex; lastIndex -= 1) {
      const randomIndex = Math.floor(Math.random() * (lastIndex + 1));

      [this.cards[lastIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[lastIndex],
      ];
    }

    const duration = 200;
    const { width: cardWidth } = this.topCard.getRect();

    await animate(
      ...this.cards.reduce((acc, card, index) => {
        const delay = index * 2;
        const { x, y } = card.getTransform();
        const offset = -index / 4;
        const randomOffset =
          (Math.round(Math.random()) * 2 - 1) *
          ((Math.random() * cardWidth) / 2 + cardWidth / 2);

        acc.push(
          {
            delay,
            duration,
            onProgress(calc) {
              card.setTransform(calc(x, randomOffset), calc(y, offset));
            },
          },
          {
            duration,
            delay: delay + duration,
            onStart() {
              card.foreground = index;
            },
            onProgress(calc) {
              card.setTransform(calc(randomOffset, offset), offset);
            },
          }
        );

        return acc;
      }, [] as AnimationConfig[])
    );
  }

  getOffsetTop() {
    const { x, y } = this.getRect();
    const { x: dx, y: dy } = this.topCard.getTransform();

    return { x: x + dx, y: y + dy };
  }

  set foreground(zIndex: string) {
    this.elem.style.zIndex = zIndex;
  }
}

export default Deck;
