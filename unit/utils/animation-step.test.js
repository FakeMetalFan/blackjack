import { getAnimationStep } from '@scripts/utils';

describe('getAnimationStep', () => {
  it('should calculate animation step', () => {
    expect(getAnimationStep(0, 1, .1)).toBe(.1);
    expect(getAnimationStep(0, 1, .5)).toBe(.5);
    expect(getAnimationStep(0, 1, .9)).toBe(.9);

    expect(getAnimationStep(50, 100, .1)).toBe(55);
    expect(getAnimationStep(50, 100, .5)).toBe(75);
    expect(getAnimationStep(50, 100, .9)).toBe(95);
  });
});
