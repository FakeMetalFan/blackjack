import createAnimation from 'utils/createAnimation';

describe('createAnimation', () => {
  it('should create animation object', () => {
    expect(createAnimation({})).toStrictEqual({
      start: expect.any(Number),
      end: expect.any(Number),
      onStart: undefined,
      onProgress: undefined,
      onEnd: undefined,
    });

    expect(createAnimation({ delay: 20, duration: 50 })).toStrictEqual({
      start: expect.any(Number),
      end: expect.any(Number),
      onStart: undefined,
      onProgress: undefined,
      onEnd: undefined,
    });

    expect(
      createAnimation({
        onStart: () => null,
        onProgress: () => null,
        onEnd: () => null,
      })
    ).toStrictEqual({
      start: expect.any(Number),
      end: expect.any(Number),
      onStart: expect.any(Function),
      onProgress: expect.any(Function),
      onEnd: expect.any(Function),
    });
  });
});
