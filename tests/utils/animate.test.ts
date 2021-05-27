import animate from '../../src/scripts/utils/animate';
import createAnimation from '../../src/scripts/utils/create-animation';

describe('animate', () => {
  let callbackSpy: jest.Mock;

  beforeEach(() => {
    callbackSpy = jest.fn();
  });

  it('should return a Promise', () => {
    expect(animate([])).toBeInstanceOf(Promise);
  });

  it('should not resolve a Promise until all the animations have completed', () => {
    animate([createAnimation({ duration: 50 })]).then(callbackSpy);

    expect(callbackSpy).not.toHaveBeenCalled();
  });

  it('should resolve a Promise upon all the animations completion', () => {
    expect(animate([])).resolves.toBe(undefined);
  });

  it('should call "requestAnimationFrame" api', async () => {
    const spy = jest.spyOn(window, 'requestAnimationFrame');

    await animate([]);

    expect(spy).toHaveBeenCalled();
  });

  it('should execute "onStart" callback', async () => {
    await animate([createAnimation({ onStart: callbackSpy })]);

    expect(callbackSpy).toHaveBeenCalled();
  });

  it('should execute "onProgress" callback', async () => {
    await animate([createAnimation({ onProgress: callbackSpy })]);

    expect(callbackSpy).toHaveBeenCalledWith(expect.any(Number));
  });

  it('should execute "onEnd" callback', async () => {
    const duration = 30;

    await animate([
      createAnimation({ duration, onEnd: callbackSpy }),
      createAnimation({ duration, delay: 30, onEnd: callbackSpy }),
    ]);

    expect(callbackSpy).toHaveBeenCalledTimes(2);
  });
});
