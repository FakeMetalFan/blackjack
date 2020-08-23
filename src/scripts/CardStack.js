import { rankValueFnMap } from './ranks';

class CardStack {
  cards = [];
  _elem;

  constructor(
    elem
  ) {
    this._elem = elem;
  }

  push(card) {
    this.cards.push(card);
    this._elem.append(card.elem);
  }

  pop() {
    return this.cards.pop();
  }

  getValue() {
    return this.cards.reduce((acc, { rank }, index) => acc += rankValueFnMap.get(rank)(acc, index), 0);
  }

  get count() {
    return this.cards.length;
  }

  get rect() {
    return this._elem.getBoundingClientRect();
  }

  get top() {
    return this.cards[this.count - 1];
  }
}

export class DeckCardStack extends CardStack {
  shuffle() {
    for (let i = this.count - 1; i; i--) {
      const j = Math.random() * i | 0;

      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  toForeground() {
    this._elem.style.zIndex = '1';
  }

  toBackground() {
    this._elem.style.zIndex = '-1';
  }

  getTopPosition() {
    const { x, y } = this.rect;
    const { x: dx, y: dy } = this.top.getPosition();

    return { x: x + dx, y: y + dy };
  }
}

export class HandCardStack extends CardStack {
  reset() {
    this.cards = [];
  }

  getTopPosition(cardWidth) {
    return { x: (this.count === 2 ? 0 : this.count - 2) * cardWidth, y: this.rect.y };
  }
}
