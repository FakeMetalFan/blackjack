import Button from '../../src/scripts/buttons/button';

describe('Button', () => {
  let elem: HTMLButtonElement;
  let btn: Button;

  beforeEach(() => {
    elem = document.createElement('button');
    btn = new Button(elem);
  });

  it('should attach handler to an element', () => {
    const spy = jest.fn();

    btn.attachHandler(spy);

    elem.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should disable an element', () => {
    btn.disable();

    expect(elem.disabled).toBe(true);
  });

  it('should enable an element', () => {
    btn.disable();
    btn.enable();

    expect(elem.disabled).toBe(false);
  });
});
