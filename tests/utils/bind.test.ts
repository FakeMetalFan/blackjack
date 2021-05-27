import bind from '../../src/scripts/utils/bind';

describe('Bind', () => {
  it(`should bind context to class's method`, () => {
    class Mock {
      @bind
      testBind(): this {
        return this;
      }
    }

    const mock = new Mock();

    const testFn = function fn(methodRef: typeof mock.testBind) {
      return methodRef();
    };

    expect(testFn(mock.testBind)).toEqual(mock);
  });
});
