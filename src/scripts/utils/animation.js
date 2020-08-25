import { easeWithCubicInOut } from './internals/cubic-in-out';

export const getAnimation = ({ duration, delay, onStart, onProgress, onComplete }) => new Promise(async (resolve) => {
  delay && await new Promise(r => setTimeout(r, delay));

  onStart && onStart();

  !duration && resolve();

  const start = performance.now();
  const requestId = requestAnimationFrame(function tick(t) {
    const dt = (t - start) / duration;

    if (dt < 1) {
      onProgress && onProgress(easeWithCubicInOut(dt));

      return requestAnimationFrame(tick);
    }

    onComplete && onComplete();

    cancelAnimationFrame(requestId);

    resolve();
  });
});
