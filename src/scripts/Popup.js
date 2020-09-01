import { getAnimation, runAnimations, getAnimationStep } from './utils';

export class Popup {
  _elem;

  constructor(
    elem
  ) {
    this._elem = elem;
  }

  show(message) {
    this._elem.innerText = message;

    runAnimations([
      getAnimation({
        duration: 200,
        onProgress: pr => this._opacity = getAnimationStep(0, 1, pr),
        onEnd: () => this._opacity = '',
      }),
    ]);
  }

  hide() {
    this._isVisible && runAnimations([
      getAnimation({
        duration: 300,
        onProgress: pr => this._opacity = getAnimationStep(1, 0, pr),
        onEnd: () => this._opacity = 0,
      }),
    ]);
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
