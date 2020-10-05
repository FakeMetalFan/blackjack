import { Button } from '@scripts/buttons';

describe('Button', () => {
  let elem;
  let btn;

  beforeEach(() => {
    elem = document.createElement('button');
    btn = new Button(elem);
  });

  it('should attach click handler to a button element', () => {
    const spy = jest.fn();

    btn.attachHandler(spy);

    elem.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should disable button element', () => {
    btn.disable();

    expect(elem.disabled).toBe(true);
  });

  it('should enable button element', () => {
    btn.disable();
    btn.enable();

    expect(elem.disabled).toBe(false);
  });
});
