import POPUP_TEXT from 'constants/popup-text';

import animate from 'utils/animate';

export default class {
  constructor(private elem: HTMLElement) {}

  show = (text: POPUP_TEXT) => {
    animate({
      duration: 200,
      onStart: () => {
        this.elem.textContent = text;
      },
      onProgress: (calc) => {
        this.setOpacity(calc(0, 1));
      },
      onEnd: () => {
        this.setOpacity('');
      },
    });
  }

  hide = () => {
    animate({
      duration: 300,
      onProgress: (calc) => {
        this.setOpacity(calc(1, 0));
      },
      onEnd: () => {
        this.setOpacity(0);
      },
    });
  };

  private setOpacity = (opacity: number | string) => {
    this.elem.style.opacity = opacity.toString();
  };
}
