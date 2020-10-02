import { getAnimation } from '@scripts/utils/animation';

describe('getAnimation', () => {
  it('should return animation object', () => {
    const animation = {
      start: expect.any(Number),
      end: expect.any(Number),
      onStart: void 0,
      onProgress: void 0,
      onEnd: void 0,
    };

    expect(getAnimation({})).toEqual(animation);
    expect(getAnimation(({ onStart: jest.fn() }))).toEqual({ ...animation, onStart: expect.any(Function) });
    expect(getAnimation(({ onProgress: jest.fn() }))).toEqual({ ...animation, onProgress: expect.any(Function) });
    expect(getAnimation(({ onEnd: jest.fn() }))).toEqual({ ...animation, onEnd: expect.any(Function) });
  });
});
