import animate from 'utils/animate';
import createAnimation from 'utils/createAnimation';
import getAnimationStep from 'utils/getAnimationStep';

class Popup {
  constructor(private elem: HTMLDivElement) {}

  show(text: string) {
    animate([
      createAnimation({
        duration: 100,
        onStart: () => {
          this.elem.textContent = text;
        },
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
    if (this.styles.opacity !== '0') {
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
  }

  private get styles() {
    return this.elem.style;
  }

  private set opacity(opacity: number | string) {
    this.styles.opacity = opacity.toString();
  }
}

export default Popup;
