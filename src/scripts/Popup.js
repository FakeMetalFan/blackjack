import { getAnimation, getAnimationStep } from './utils';

export class Popup {
  _elem;

  constructor(
    elem
  ) {
    this._elem = elem;
  }

  show(message) {
    this._elem.innerText = message;

    getAnimation({
      duration: 200,
      onProgress: dt => this._opacity = getAnimationStep(0, 1, dt),
      onComplete: () => this._opacity = '',
    });
  }

  hide() {
    this._isVisible && getAnimation({
      duration: 300,
      onProgress: dt => this._opacity = getAnimationStep(1, 0, dt),
      onComplete: () => this._opacity = 0,
    });
  }

  get _style() {
    return this._elem.style;
  }

  set _opacity(val) {
    this._style.opacity = val;
  }

  get _isVisible() {
    return this._style.opacity !== '0';
  }
}
