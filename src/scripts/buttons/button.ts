export default class {
  constructor(private elem: HTMLButtonElement) {}

  attachHandler = (callback: () => void) => {
    this.elem.onclick = callback;
  };

  disable = () => {
    this.elem.setAttribute('disabled', '');
  };

  enable = () => {
    this.elem.removeAttribute('disabled');
  };
}
