import { screen } from '@testing-library/dom';
import Button from 'buttons/button';
import Buttons from 'buttons/buttons';

describe('Buttons', () => {
  let btns: Buttons;

  beforeEach(() => {
    const createBtn = (name: string) => {
      const elem = document.createElement('button');

      elem.textContent = name;
      document.body.append(elem);

      return new Button(elem);
    };

    btns = new Buttons(
      createBtn('deal'),
      createBtn('reset'),
      createBtn('hit'),
      createBtn('stand')
    );
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should disable all buttons', () => {
    btns.disableAll();

    expect(screen.getByText('deal')).toBeDisabled();
    expect(screen.getByText('reset')).toBeDisabled();
    expect(screen.getByText('hit')).toBeDisabled();
    expect(screen.getByText('stand')).toBeDisabled();
  });

  it('should enable hit and stand', () => {
    btns.disableAll();
    btns.enableHitAndStand();

    expect(screen.getByText('hit')).toBeEnabled();
    expect(screen.getByText('stand')).toBeEnabled();
  });
});
