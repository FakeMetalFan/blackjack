import Rank from 'constants/ranks';
import Suit from 'constants/suits';
import getTransformValue from 'utils/getTransformValue';

class Card {
  elem = document.createElement('div');

  rank: Rank;

  private backClassName = 'card back';

  private faceClassName: string;

  constructor(rank: Rank, suit: Suit, index = 0) {
    this.rank = rank;

    const offset = -index / 4;

    this.setTransform(offset, offset).foreground = index;

    this.faceClassName = `card ${rank}-of-${suit}`;
    this.className = this.backClassName;
  }

  show() {
    this.className = this.faceClassName;

    return this;
  }

  hide() {
    this.className = this.backClassName;

    return this;
  }

  setTransform(x: number, y: number) {
    this.styles.transform = `translate(${x}px, ${y}px)`;

    return this;
  }

  getTransform() {
    return getTransformValue(this.elem);
  }

  getRect() {
    return this.elem.getBoundingClientRect();
  }

  private set className(className: string) {
    this.elem.className = className;
  }

  set foreground(zIndex: number) {
    this.styles.zIndex = zIndex.toString();
  }

  set opacity(opacity: number) {
    this.styles.opacity = opacity.toString();
  }

  private get styles() {
    return this.elem.style;
  }
}

export default Card;
