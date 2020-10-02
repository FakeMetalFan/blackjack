import { Button } from './Button';

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
    this._buttons.forEach(({ elem }) => {
      this._elem.append(elem);
    });
  }

  disableAll() {
    this._buttons.forEach(btn => {
      btn.disable();
    });
  }

  allowHitOrStand() {
    this.hit.enable();
    this.stand.enable();
  }

  get _buttons() {
    return [this.deal, this.reset, this.hit, this.stand];
  }
}
