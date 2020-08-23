class Button {
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

export class Buttons {
  deal = new Button(document.getElementById('deal-btn'));
  reset = new Button(document.getElementById('reset-btn'));
  hit = new Button(document.getElementById('hit-btn'));
  stand = new Button(document.getElementById('stand-btn'));

  disableAll() {
    [this.deal, this.reset, this.hit, this.stand].forEach(btn => btn.disable());
  }
}
