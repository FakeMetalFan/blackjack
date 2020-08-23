import { getTransformValue, getWidth } from '../../utils';

export class Card {
  elem = document.createElement('div');

  rank;

  _backClassName = `card back`;
  _faceClassName;

  constructor(
    rank,
    suit
  ) {
    this.rank = rank;

    this._faceClassName = `card ${rank}-of-${suit}`;
    this._className = this._faceClassName;

    this.setOpacity(0);
  }

  setOpacity(opacity) {
    this._style.opacity = opacity;
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
    this.elem.style.zIndex = z;
  }

  get _style() {
    return this.elem.style;
  }

  set _className(className) {
    this.elem.className = className;
  }
}
