import { Button, Buttons } from '@scripts/buttons';

describe('Buttons', () => {
  let elem;
  let buttons;

  beforeEach(() => {
    elem = document.createElement('div');
    buttons = new Buttons(elem);
  });

  it('should create deal, reset, hit and stand buttons', () => {
    expect(elem.childElementCount).toBe(4);
  });

  it('should disable all buttons', () => {
    const spy = jest.spyOn(Button.prototype, 'disable');

    buttons.disableAll();

    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should allow hit or stand', () => {
    const spy = jest.spyOn(Button.prototype, 'enable');

    buttons.disableAll();
    buttons.allowHitOrStand();

    expect(spy).toHaveBeenCalledTimes(2);
  });
});
