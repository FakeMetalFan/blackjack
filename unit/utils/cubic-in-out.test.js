import { easeWithCubicInOut } from '@scripts/utils';

describe('easeWithCubicInOut', () => {
  it('should ease animation progress', () => {
    expect(easeWithCubicInOut(0)).toBe(0);
    expect(easeWithCubicInOut(.1)).toBe(.004000000000000001);
    expect(easeWithCubicInOut(.2)).toBe(.03200000000000001);
    expect(easeWithCubicInOut(.3)).toBe(.10799999999999998);
    expect(easeWithCubicInOut(.4)).toBe(.25600000000000006);
    expect(easeWithCubicInOut(.5)).toBe(.5);
    expect(easeWithCubicInOut(.6)).toBe(.744);
    expect(easeWithCubicInOut(.7)).toBe(.8919999999999999);
    expect(easeWithCubicInOut(.8)).toBe(.968);
    expect(easeWithCubicInOut(.9)).toBe(.996);
  });
});
