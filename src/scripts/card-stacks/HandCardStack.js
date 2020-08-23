import { CardStack } from './internals/CardStack';

export class HandCardStack extends CardStack {
  reset() {
    this.cards = [];
  }

  getTopPosition(cardWidth) {
    return { x: (this.count === 2 ? 0 : this.count - 2) * cardWidth, y: this.rect.y };
  }
}
