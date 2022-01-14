import Stack from 'data-structures/stack';

import Card from './deck/card';

export default abstract class extends Stack<Card> {
  constructor(protected elem: HTMLElement) {
    super();
  }

  push = (card: Card) => {
    this.elem.append(card.elem);

    super.push(card);

    return this;
  };

  getRect = () => this.elem.getBoundingClientRect();
}
