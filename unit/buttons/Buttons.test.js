import { Button, Buttons } from '@scripts/buttons';

describe('Buttons', () => {
  let buttons;

  beforeEach(() => {
    const createBtn = () => document.createElement('button');

    buttons = new Buttons(createBtn(), createBtn(), createBtn(), createBtn());
  });

  it('should create deal, reset, hit and stand buttons', () => {
    expect(buttons.deal).toBeDefined();
    expect(buttons.reset).toBeDefined();
    expect(buttons.hit).toBeDefined();
    expect(buttons.stand).toBeDefined();
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
