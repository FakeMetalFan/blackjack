import animate from 'animate';

describe('animate', () => {
  const callbackMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a Promise', () => {
    expect(animate()).toBeInstanceOf(Promise);
  });

  it('should not resolve a Promise until completion', () => {
    animate({ duration: 50 }).then(callbackMock);

    expect(callbackMock).not.toHaveBeenCalledTimes(1);
  });

  it('should resolve a Promise upon completion', () => {
    expect(animate()).resolves.toBe(undefined);
  });

  it('should execute "onStart" callback', async () => {
    await animate({ onStart: callbackMock });

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  it('should execute "onProgress" callback', async () => {
    await animate({ onProgress: callbackMock });

    expect(callbackMock).toHaveBeenCalledWith(expect.any(Number));
  });

  it('should execute "onEnd" callback', async () => {
    await animate(
      { duration: 15, onEnd: callbackMock },
      { duration: 20, delay: 30, onEnd: callbackMock }
    );

    expect(callbackMock).toHaveBeenCalledTimes(2);
  });
});
