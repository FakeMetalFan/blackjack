import easeAnimation from '../../src/scripts/utils/ease-animation';

describe('easeAnimation', () => {
  it('should ease animation progress', () => {
    expect(easeAnimation(0)).toBe(0);
    expect(easeAnimation(0.1)).toBe(0.004000000000000001);
    expect(easeAnimation(0.2)).toBe(0.03200000000000001);
    expect(easeAnimation(0.3)).toBe(0.10799999999999998);
    expect(easeAnimation(0.4)).toBe(0.25600000000000006);
    expect(easeAnimation(0.5)).toBe(0.5);
    expect(easeAnimation(0.6)).toBe(0.744);
    expect(easeAnimation(0.7)).toBe(0.8919999999999999);
    expect(easeAnimation(0.8)).toBe(0.968);
    expect(easeAnimation(0.9)).toBe(0.996);
  });
});
