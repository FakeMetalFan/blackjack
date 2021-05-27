import Button from '../../src/scripts/buttons/button';
import Buttons from '../../src/scripts/buttons/buttons';

describe('Buttons', () => {
  let buttons: Buttons;

  beforeEach(() => {
    const createBtn = () => new Button(document.createElement('button'));

    buttons = new Buttons(createBtn(), createBtn(), createBtn(), createBtn());
  });

  it('should have deal, reset, hit and stand buttons', () => {
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

  it('should enable hit and stand', () => {
    const spy = jest.spyOn(Button.prototype, 'enable');

    buttons.disableAll();
    buttons.enableHitAndStand();

    expect(spy).toHaveBeenCalledTimes(2);
  });
});
