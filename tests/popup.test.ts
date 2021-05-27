import Popup from '../src/scripts/popup';
import { Animation } from '../src/scripts/utils/animate';

jest.mock('../src/scripts/utils/animate', () => ({
  __esModule: true,
  default: (animations: Animation[]) => {
    animations.forEach(({ onProgress, onEnd }) => {
      onProgress?.(0.996);
      onEnd?.();
    });
  },
}));

describe('Popup', () => {
  let elem: HTMLDivElement;
  let popup: Popup;

  const setOpacity = (val: string | number) => {
    elem.style.opacity = val.toString();
  };

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
