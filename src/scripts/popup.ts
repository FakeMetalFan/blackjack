import animate from './utils/animate';
import createAnimation from './utils/create-animation';
import getAnimationStep from './utils/get-animation-step';

class Popup {
  constructor(private elem: HTMLDivElement) {}

  show(text: string) {
    this.text = text;

    animate([
      createAnimation({
        duration: 100,
        onProgress: (progress) => {
          this.opacity = getAnimationStep(0, 1, progress);
        },
        onEnd: () => {
          this.opacity = '';
        },
      }),
    ]);
  }

  hide() {
    this.text = '';

    animate([
      createAnimation({
        duration: 200,
        onProgress: (progress) => {
          this.opacity = getAnimationStep(1, 0, progress);
        },
        onEnd: () => {
          this.opacity = 0;
        },
      }),
    ]);
  }

  private set text(text: string) {
    this.elem.innerText = text;
  }

  private set opacity(opacity: number | string) {
    this.elem.style.opacity = opacity.toString();
  }
}

export default Popup;
