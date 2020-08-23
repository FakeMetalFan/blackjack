import { getAnimation, getAnimationStep } from './utils';

export class Popup {
  elem = document.getElementById('popup');

  show(message) {
    this.elem.innerText = message;

    getAnimation({
      duration: 200,
      onProgress: dt => this._setOpacity(getAnimationStep(0, 1, dt)),
      onComplete: () => this._setOpacity(''),
    });
  }

  hide() {
    this._isVisible && getAnimation({
      duration: 300,
      onProgress: dt => this._setOpacity(getAnimationStep(1, 0, dt)),
      onComplete: () => this._setOpacity(0),
    });
  }

  _setOpacity(opacity) {
    this.elem.style.opacity = opacity;
  }

  get _isVisible() {
    return this.elem.style.opacity !== '0';
  }
}
