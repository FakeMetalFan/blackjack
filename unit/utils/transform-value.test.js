import { getTransformValue } from '@scripts/utils';

describe('getTransformValue', () => {
  it(`should return transform's x, y values`, () => {
    const elem = document.createElement('div');

    elem.style.transform = 'translate(1px, 1px)';

    expect(getTransformValue(elem)).toEqual(expect.any(Object));
  });
});
