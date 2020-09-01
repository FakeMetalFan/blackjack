import { Button } from './internals/Button';
import { getAnimation, getAnimationStep, runAnimations } from '../utils';

export class Buttons {
  deal = new Button(document.createElement('button'), 'Deal');
  reset = new Button(document.createElement('button'), 'Reset');
  hit = new Button(document.createElement('button'), 'Hit');
  stand = new Button(document.createElement('button'), 'Stand');

  _elem;

  constructor(
    elem
  ) {
    this._elem = elem;

    this._init();
  }

  disableAll() {
    this._buttons.forEach(btn => btn.disable());
  }

  allowHitOrStand() {
    this.hit.enable();
    this.stand.enable();
  }

  _init() {
    this._opacity = 0;
    this._buttons.forEach(({ elem: btn }) => this._elem.append(btn));

    runAnimations([
      getAnimation({
        duration: 200,
        onProgress: pr => this._opacity = getAnimationStep(0, 1, pr),
        onEnd: () => this._opacity = '',
      }),
    ]);
  }

  get _buttons() {
    return [this.deal, this.reset, this.hit, this.stand];
  }

  set _opacity(val) {
    this._elem.style.opacity = val;
  }
}
