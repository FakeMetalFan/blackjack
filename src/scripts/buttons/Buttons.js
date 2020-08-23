import { Button } from './internals/Button';

export class Buttons {
  deal = new Button(document.getElementById('deal-btn'));
  reset = new Button(document.getElementById('reset-btn'));
  hit = new Button(document.getElementById('hit-btn'));
  stand = new Button(document.getElementById('stand-btn'));

  disableAll() {
    [this.deal, this.reset, this.hit, this.stand].forEach(btn => btn.disable());
  }
}
