import { getWidth } from '@scripts/utils';

describe('getWidth', () => {
  it(`should parse element's width`, () => {
    const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle');
    const getPropertyValueSpy = jest.spyOn(CSSStyleDeclaration.prototype, 'getPropertyValue');

    const mock = document.createElement('div');
    const width = 80;

    mock.style.width = `${width}px`;

    expect(getWidth(mock)).toBe(width);
    expect(getComputedStyleSpy).toHaveBeenCalledWith(mock);
    expect(getPropertyValueSpy).toHaveBeenCalledWith('width');
  });
});
