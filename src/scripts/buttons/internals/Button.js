export class Button {
  _elem;

  constructor(
    elem
  ) {
    this._elem = elem;
  }

  attachHandler(handlerFn) {
    this._elem.onclick = () => handlerFn();
  }

  disable() {
    this._elem.setAttribute('disabled', '');
  }

  enable() {
    this._elem.removeAttribute('disabled');
  }
}
