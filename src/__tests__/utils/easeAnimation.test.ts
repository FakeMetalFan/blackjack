import easeAnimationProgress from 'utils/easeAnimationProgress';

describe('easeAnimationProgress', () => {
  it('should ease animation progress', () => {
    expect(easeAnimationProgress(0)).toBe(0);
    expect(easeAnimationProgress(0.1)).toBe(0.004000000000000001);
    expect(easeAnimationProgress(0.2)).toBe(0.03200000000000001);
    expect(easeAnimationProgress(0.3)).toBe(0.10799999999999998);
    expect(easeAnimationProgress(0.4)).toBe(0.25600000000000006);
    expect(easeAnimationProgress(0.5)).toBe(0.5);
    expect(easeAnimationProgress(0.6)).toBe(0.744);
    expect(easeAnimationProgress(0.7)).toBe(0.8919999999999999);
    expect(easeAnimationProgress(0.8)).toBe(0.968);
    expect(easeAnimationProgress(0.9)).toBe(0.996);
  });
});
