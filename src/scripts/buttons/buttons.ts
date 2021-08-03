import Button from './button';

class Buttons {
  constructor(
    public deal: Button,
    public reset: Button,
    public hit: Button,
    public stand: Button
  ) {}

  disableAll() {
    this.deal.disable();
    this.reset.disable();
    this.hit.disable();
    this.stand.disable();
  }

  enableAllExceptDeal() {
    this.reset.enable();
    this.hit.enable();
    this.stand.enable();
  }
}

export default Buttons;
