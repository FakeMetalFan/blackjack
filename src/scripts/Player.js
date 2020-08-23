import { Hand } from './Hand';

export class Player extends Hand {
  constructor() {
    super(document.getElementById('player'));
  }
}
