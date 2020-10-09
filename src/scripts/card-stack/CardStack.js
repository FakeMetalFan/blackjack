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

    return this;
  }

  pop() {
    return this.cards.pop();
  }

  getRect() {
    return this._elem.getBoundingClientRect();
  }

  get count() {
    return this.cards.length;
  }

  get topCard() {
    return this.cards[this.count - 1];
  }
}
