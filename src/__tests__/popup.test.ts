import { screen } from '@testing-library/dom';
import * as animate from 'animate';
import Popup from 'popup';

describe('Popup', () => {
  let popup: Popup;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (animate as any).default = (animations: animate.AnimationConfig[]) => {
      animations.forEach(({ onStart, onProgress, onEnd }) => {
        onStart?.();
        onProgress?.(() => 0.996);
        onEnd?.();
      });
    };
  });

  beforeEach(() => {
    const elem = document.createElement('div');

    document.body.append(elem);
    popup = new Popup(elem);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should show message', () => {
    popup.show('text');

    expect(screen.getByText('text')).toBeVisible();
  });

  it('should hide', () => {
    popup.show('text');
    popup.hide();

    expect(screen.getByText('text')).not.toBeVisible();
  });
});
