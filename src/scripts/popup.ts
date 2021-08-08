import animate from './animate';

class Popup {
  constructor(private elem: HTMLDivElement) {}

  show(text: string) {
    animate({
      duration: 100,
      onStart: () => {
        this.elem.textContent = text;
      },
      onProgress: (calc) => {
        this.opacity = calc(0, 1);
      },
      onEnd: () => {
        this.opacity = '';
      },
    });
  }

  hide() {
    if (this.styles.opacity !== '0') {
      animate({
        duration: 200,
        onProgress: (calc) => {
          this.opacity = calc(1, 0);
        },
        onEnd: () => {
          this.opacity = 0;
        },
      });
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
