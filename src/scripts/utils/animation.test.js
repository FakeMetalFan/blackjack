import { getAnimation } from './animation';

describe('getAnimation', () => {
  it('should wait with provided delay', () => {
    const delay = 1e4;
    const spy = jest.spyOn(window, 'setTimeout');

    getAnimation({ delay });

    expect(spy).toHaveBeenCalledWith(expect.any(Function), delay);
  });

  it('should execute provided function on start', () => {
    const spy = jest.fn();

    getAnimation({ onStart: spy });

    expect(spy).toHaveBeenCalled();
  });

  it('should last provided duration and run provided function on completion', async () => {
    const fnSpy = jest.fn();
    const requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');

    await getAnimation({ duration: 50, onComplete: fnSpy })

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    expect(fnSpy).toHaveBeenCalled();
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });

  it('should run provided "animation progress" function during execution', async () => {
    let executionCount = 0;
    const spy = jest.fn(() => executionCount++);

    await getAnimation({ duration: 50, onProgress: spy });

    expect(spy).toHaveBeenCalled();
    expect(executionCount).toBeGreaterThan(0);
  });
});
