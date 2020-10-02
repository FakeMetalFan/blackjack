export class Button {
  elem;

  constructor(
    elem,
    name
  ) {
    elem.innerText = name;

    this.elem = elem;
  }

  attachHandler(handlerFn) {
    this.elem.onclick = handlerFn;
  }

  disable() {
    this.elem.setAttribute('disabled', '');
  }

  enable() {
    this.elem.removeAttribute('disabled');
  }
}
