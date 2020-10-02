import { bind } from '@scripts/decorators/bind';

describe('bind', () => {
  class Mock {
    @bind
    testBind() {
      return this;
    }
  }

  const mock = new Mock;
  const testFn = function(methodRef) {
    return methodRef();
  };

  it(`should bind context to class's method`, () => {
    const spy = jest.spyOn(Function.prototype, 'bind');

    mock.testBind();

    expect(spy).toHaveBeenCalledWith(mock);
    expect(testFn(mock.testBind)).toEqual(mock);
  });
});
