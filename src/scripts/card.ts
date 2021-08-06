import Rank from 'constants/ranks';
import Suit from 'constants/suits';

import animate from './animate';

const createDiv = (...classNames: string[]) => {
  const div = document.createElement('div');

  div.classList.add(...classNames);

  return div;
};

class Card {
  elem = createDiv('card');

  rank: Rank;

  constructor(rank: Rank, suit: Suit, index = 0) {
    this.rank = rank;

    const inner = createDiv('inner');

    inner.append(createDiv('back'));
    inner.append(createDiv('face', `${rank}-of-${suit}`));

    this.elem.append(inner);

    const offset = -index / 4;

    this.setTransform(offset, offset).foreground = index;
  }

  async show() {
    await animate({
      duration: 400,
      onProgress: (calc) => {
        this.rotationY = calc(0, 180);
      },
    });
  }

  hide() {
    animate({
      duration: 200,
      onProgress: (calc) => {
        this.rotationY = calc(180, 0);
      },
    });

    return this;
  }

  setTransform(x: number, y: number) {
    this.styles.transform = `translate(${x}px, ${y}px)`;

    return this;
  }

  getTransform() {
    const { m41, m42 } = new WebKitCSSMatrix(this.styles.transform);

    return { x: m41, y: m42 };
  }

  getRect() {
    return this.elem.getBoundingClientRect();
  }

  toggleClass(className: string) {
    this.elem.classList.toggle(className);

    return this;
  }

  set foreground(zIndex: number) {
    this.styles.zIndex = zIndex.toString();
  }

  set opacity(opacity: number) {
    this.styles.opacity = opacity.toString();
  }

  private set rotationY(deg: number) {
    (
      this.elem.firstChild as HTMLElement
    ).style.transform = `rotateY(${deg}deg)`;
  }

  private get styles() {
    return this.elem.style;
  }
}

export default Card;
