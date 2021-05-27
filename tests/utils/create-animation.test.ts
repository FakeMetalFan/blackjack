import createAnimation from '../../src/scripts/utils/create-animation';

describe('createAnimation', () => {
  it('should create animation object', () => {
    expect(createAnimation({})).toEqual({
      start: expect.any(Number),
      end: expect.any(Number),
    });

    expect(createAnimation({ delay: 20, duration: 50 })).toEqual({
      start: expect.any(Number),
      end: expect.any(Number),
    });

    expect(
      createAnimation({
        onStart: () => null,
        onProgress: () => null,
        onEnd: () => null,
      })
    ).toEqual({
      start: expect.any(Number),
      end: expect.any(Number),
      onStart: expect.any(Function),
      onProgress: expect.any(Function),
      onEnd: expect.any(Function),
    });
  });
});
