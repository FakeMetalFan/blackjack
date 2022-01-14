import RANK from 'constants/rank';
import SUIT from 'constants/suit';

import animate from 'utils/animate';
import createElem from 'utils/create-elem';
import getTransformPoint from 'utils/get-transform-point';

const createCardElem = (rank: RANK, suit: SUIT) => {
  const card = createElem<HTMLDivElement>('div', {
    classes: ['card'],
  });
  const inner = createElem<HTMLDivElement>('div', {
    classes: ['inner'],
  });

  inner.append(createElem('div', {
    classes: ['back'],
  }));

  inner.append(createElem('div', {
    classes: ['face', `${rank}_of_${suit}`],
  }));

  card.append(inner);

  return card;
};

export default class {
  elem = createCardElem(this.rank, this.suit);

  constructor(public rank: RANK, public suit: SUIT, index = 0) {
    this
      .setPoint(-index / 4)
      .setForeground(index);
  }

  show = async () => {
    await animate({
      duration: 400,
      onProgress: (calc) => {
        this.setRotateY(calc(0, 180));
      },
    });
  };

  hide = () => {
    animate({
      duration: 200,
      onProgress: (calc) => {
        this.setRotateY(calc(180, 0));
      },
    });

    return this;
  };

  setPoint = (x: number, y = x) => {
    this.styles.transform = `translate(${x}px, ${y}px)`;

    return this;
  };

  getPoint = () => getTransformPoint(this.elem);

  getRect = () => this.elem.getBoundingClientRect();

  setForeground = (zIndex: number | string) => {
    this.styles.zIndex = zIndex.toString();

    return this;
  };

  setOpacity = (opacity: number) => {
    this.styles.opacity = opacity.toString();

    return this;
  };

  private setRotateY = (deg: number) => {
    (this.elem.firstChild as HTMLElement).style.transform
      = `rotateY(${deg}deg)`;
  };

  private get styles() {
    return this.elem.style;
  }
}
