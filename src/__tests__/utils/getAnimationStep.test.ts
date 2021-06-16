import getAnimationStep from 'utils/getAnimationStep';

describe('getAnimationStep', () => {
  it('should calculate animation step', () => {
    expect(getAnimationStep(0, 1, 0.1)).toBe(0.1);
    expect(getAnimationStep(0, 1, 0.5)).toBe(0.5);
    expect(getAnimationStep(0, 1, 0.9)).toBe(0.9);

    expect(getAnimationStep(50, 100, 0.1)).toBe(55);
    expect(getAnimationStep(50, 100, 0.5)).toBe(75);
    expect(getAnimationStep(50, 100, 0.9)).toBe(95);
  });
});
