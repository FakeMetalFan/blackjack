import { fireEvent, screen } from '@testing-library/dom';
import Button from 'buttons/button';

describe('Button', () => {
  let btn: Button;

  beforeEach(() => {
    const elem = document.createElement('button');

    elem.textContent = 'btn';
    btn = new Button(elem);

    document.body.append(elem);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should attach handler to an element', () => {
    const callbackMock = jest.fn();

    btn.attachHandler(callbackMock);

    fireEvent.click(screen.getByText('btn'));

    expect(callbackMock).toHaveBeenCalled();
  });

  it('should disable an element', () => {
    btn.disable();

    expect(screen.getByText('btn')).toBeDisabled();
  });

  it('should enable an element', () => {
    btn.disable();
    btn.enable();

    expect(screen.getByText('btn')).toBeEnabled();
  });
});
