import { getFontSize } from './font-size';

describe('getFontSize', () => {
  it('should parse font-size from document.body', () => {
    const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle');
    const getPropertyValueSpy = jest.spyOn(CSSStyleDeclaration.prototype, 'getPropertyValue');

    getFontSize();

    expect(getComputedStyleSpy).toHaveBeenCalledWith(expect.any(Object));
    expect(getPropertyValueSpy).toHaveBeenCalledWith('font-size');
  });
});
