import { CardStack } from './CardStack';

export class HandCardStack extends CardStack {
  empty() {
    this.cards = [];
  }

  getTopPosition(cardWidth) {
    return { x: (this.count === 2 ? 0 : this.count - 2) * cardWidth, y: this.rect.y };
  }
}
