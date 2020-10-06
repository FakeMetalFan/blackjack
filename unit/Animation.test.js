import { Animation } from '@scripts/Animation';

describe('Animation', () => {
  it('should create animation object', () => {
    expect(new Animation({})).toEqual({
      start: expect.any(Number),
      end: expect.any(Number),
      onStart: void 0,
      onProgress: void 0,
      onEnd: void 0,
    });

    expect(new Animation({ delay: 20, duration: 50 })).toEqual({
      start: expect.any(Number),
      end: expect.any(Number),
      onStart: void 0,
      onProgress: void 0,
      onEnd: void 0,
    });

    expect(new Animation({ onStart: () => void 0, onProgress: () => void 0, onEnd: () => void 0 })).toEqual({
      start: expect.any(Number),
      end: expect.any(Number),
      onStart: expect.any(Function),
      onProgress: expect.any(Function),
      onEnd: expect.any(Function),
    });
  });
});
