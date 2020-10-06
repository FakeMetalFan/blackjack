import { getTransformValue, getWidth } from './utils';

export class Card {
  elem = document.createElement('div');

  rank;

  _backClassName = 'card back';

  _faceClassName;

  constructor(
    rank,
    suit,
    x,
    y,
    z
  ) {
    this.rank = rank;
    this.setPosition(x, y);
    this.foreground = z;

    this._faceClassName = `card ${rank}-of-${suit}`;
    this._className = this._backClassName;
  }

  show() {
    this._className = this._faceClassName;
  }

  hide() {
    this._className = this._backClassName;
  }

  getPosition() {
    return getTransformValue(this.elem);
  }

  setPosition(x, y) {
    this._style.transform = `translate(${x}px, ${y}px)`;
  }

  getWidth() {
    return getWidth(this.elem);
  }

  set foreground(z) {
    this._style.zIndex = z;
  }

  get _style() {
    return this.elem.style;
  }

  set _className(className) {
    this.elem.className = className;
  }
}
