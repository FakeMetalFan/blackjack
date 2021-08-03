import Card from 'card';

abstract class CardStack {
  cards: Card[] = [];

  constructor(protected elem: HTMLDivElement) {}

  push(card: Card) {
    this.cards.push(card);
    this.elem.append(card.elem);

    return this;
  }

  pop() {
    return this.cards.pop();
  }

  getRect() {
    return this.elem.getBoundingClientRect();
  }

  get count() {
    return this.cards.length;
  }

  get topCard() {
    return this.cards[this.count - 1];
  }
}

export default CardStack;
