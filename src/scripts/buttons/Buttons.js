import { Button } from './Button';

export class Buttons {
  deal;
  reset;
  hit;
  stand;

  constructor(
    dealBtnElem,
    resetBtnElem,
    hitBtnElem,
    standBtnElem
  ) {
    this.deal = new Button(dealBtnElem);
    this.reset = new Button(resetBtnElem);
    this.hit = new Button(hitBtnElem);
    this.stand = new Button(standBtnElem);
  }

  disableAll() {
    this.deal.disable();
    this.reset.disable();
    this.hit.disable();
    this.stand.disable();
  }

  allowHitOrStand() {
    this.hit.enable();
    this.stand.enable();
  }
}
