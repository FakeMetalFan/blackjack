import { rankValueFnMap } from '../../consts';

export class CardStack {
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
