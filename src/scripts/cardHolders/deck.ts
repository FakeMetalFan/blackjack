import Card from 'card';
import Rank from 'constants/ranks';
import Suit from 'constants/suits';
import animate from 'utils/animate';
import createAnimation from 'utils/createAnimation';
import getAnimationStep from 'utils/getAnimationStep';

import CardStack from './cardStack';

class Deck extends CardStack {
  constructor(elem: HTMLDivElement, suits: Suit[], ranks: Rank[]) {
    super(elem);

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        const offset = -this.count / 4;
        const card = new Card(rank, suit, this.count)
          .show()
          .setTransform(offset, -200 + offset);

        card.opacity = 0;

        this.push(card);
      });
    });
  }

  async intro() {
    await animate(
      this.cards.map((card, index) => {
        const { x, y } = card.getTransform();
        const offset = -index / 4;

        return createAnimation({
          delay: index * 8,
          duration: 600,
          onProgress: (pr) => {
            /* eslint-disable no-param-reassign */
            card.setTransform(
              getAnimationStep(x, offset, pr),
              getAnimationStep(y, offset, pr)
            ).opacity = getAnimationStep(0, 1, pr);
          },
          onEnd: () => {
            card.hide();
          },
        });
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

    await animate(
      this.cards.reduce((animations, card, index) => {
        const delay = index * 2;
        const duration = 200;
        const { x, y } = card.getTransform();
        const offset = -index / 4;
        const randomOffset =
          (Math.round(Math.random()) * 2 - 1) *
          ((Math.random() * card.getRect().width) / 2 + 30);

        animations.push(
          createAnimation({
            delay,
            duration,
            onProgress: (pr) => {
              card.setTransform(
                getAnimationStep(x, randomOffset, pr),
                getAnimationStep(y, offset, pr)
              );
            },
          }),
          createAnimation({
            duration,
            delay: delay + duration,
            onStart: () => {
              card.foreground = index;
            },
            onProgress: (pr) => {
              card.setTransform(
                getAnimationStep(randomOffset, offset, pr),
                offset
              );
            },
          })
        );

        return animations;
      }, [])
    );
  }

  getOffsetTop() {
    const { x, y } = this.getRect();
    const { x: dx, y: dy } = this.topCard.getTransform();

    return { x: x + dx, y: y + dy };
  }
}

export default Deck;
