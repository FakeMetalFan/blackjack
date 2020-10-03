import { CardStack } from './CardStack';

export class DeckCardStack extends CardStack {
  shuffle() {
    for (let i = this.count - 1; i; i--) {
      const j = Math.random() * (i + 1) | 0;

      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  toForeground() {
    this._style.zIndex = '1';
  }

  toBackground() {
    this._style.zIndex = '-1';
  }

  getTopPosition() {
    const { x, y } = this.rect;
    const { x: dx, y: dy } = this.top.getPosition();

    return { x: x + dx, y: y + dy };
  }

  get _style() {
    return this._elem.style;
  }
}
