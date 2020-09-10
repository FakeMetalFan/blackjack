import { Popup } from './Popup';

jest.mock('./utils/animation-runner', () => ({
  runAnimations: animations => {
    animations.forEach(({ onProgress, onEnd }) => {
      onProgress?.(.996);
      onEnd?.();
    });
  },
}));

describe('Popup', () => {
  let elem;
  let popup;

  const setOpacity = val => elem.style.opacity = val;
  const getOpacity = () => elem.style.opacity;

  beforeEach(() => {
    elem = document.createElement('div');
    popup = new Popup(elem);
  });

  it('should show message', () => {
    const message = 'message';

    setOpacity(0);

    popup.show(message);

    expect(elem.innerText).toBe(message);
    expect(getOpacity()).toBe('');
  });

  it('should hide', () => {
    setOpacity(1);

    popup.hide();

    expect(getOpacity()).toBe('0');
  });
});
