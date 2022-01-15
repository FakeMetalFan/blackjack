import RANK from 'constants/rank';
import SUIT from 'constants/suit';
import animate from 'utils/animate';

import CardStack from '../card-stack';

import Card from './card';

export default class extends CardStack {
  constructor(elem: HTMLElement, suits: SUIT[], ranks: RANK[]) {
    super(elem);

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        const offset = -this.size / 4;

        this.push(new Card(rank, suit, this.size)
          .setPoint(offset, -150 + offset)
          .setOpacity(0),
        );
      });
    });
  }

  intro = async () => {
    await animate(...this.items.map<AnimationProps>((card, index) => {
      const {
        x,
        y,
      } = card.getPoint();
      const offset = -index / 4;

      return {
        delay: index * 8,
        duration: 600,
        onProgress: (calc) => {
          card
            .setPoint(calc(x, offset), calc(y, offset))
            .setOpacity(calc(0, 1));
        },
      };
    }));
  };

  shuffle = async () => {
    for (let prev = this.size - 1; prev; prev -= 1) {
      const next = Math.floor(Math.random() * (prev + 1));

      [
        this.items[prev],
        this.items[next],
      ] = [
        this.items[next],
        this.items[prev],
      ];
    }

    const duration = 200;
    const cardWidth = this.peek.getRect().width;

    await animate(...this.items.reduce((acc: AnimationProps[], card, index) => {
      const delay = index * 2;
      const {
        x,
        y,
      } = card.getPoint();
      const offset = -index / 4;
      const randomOffset = (Math.round(Math.random()) * 2 - 1)
        * ((Math.random() * cardWidth) / 2 + cardWidth / 2);

      acc.push(
        {
          delay,
          duration,
          onProgress: (calc) => {
            card.setPoint(calc(x, randomOffset), calc(y, offset));
          },
        },
        {
          duration,
          delay: delay + duration,
          onStart() {
            card.setForeground(index);
          },
          onProgress: (calc) => {
            card.setPoint(calc(randomOffset, offset), offset);
          },
        },
      );

      return acc;
    }, []));
  };

  getOffsetTop() {
    const {
      x,
      y,
    } = this.getRect();
    const {
      x: dx,
      y: dy,
    } = this.peek.getPoint();

    return {
      x: x + dx,
      y: y + dy,
    };
  }
}
