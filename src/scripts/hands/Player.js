import { Hand } from './internals/Hand';

export class Player extends Hand {
  constructor() {
    super(document.getElementById('player'));
  }
}
