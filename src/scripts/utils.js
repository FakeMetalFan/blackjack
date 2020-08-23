const easeWithCubicInOut = dt => dt < .5
  ? 4 * dt ** 3
  : (dt - 1) * (2 * dt - 2) * (2 * dt - 2) + 1;

export const getAnimation = ({ duration, delay, onStart, onProgress, onComplete }) => new Promise(async (resolve) => {
  delay && await new Promise(r => setTimeout(r, delay));

  onStart && onStart();

  const start = performance.now();
  const requestId = requestAnimationFrame(function tick(t) {
    const dt = (t - start) / duration;

    if (dt < 1) {
      onProgress(easeWithCubicInOut(dt));

      return requestAnimationFrame(tick);
    }

    onComplete && onComplete();
    cancelAnimationFrame(requestId);
    resolve();
  });
});

export const getAnimationStep = (from, to, dt) => from + (to - from) * dt;

export const getTransformValue = elem => {
  const [, , , , x, y] = getComputedStyle(elem).transform.replace(/[^0-9\-.,]/g, '').split(',');

  return { x: +x || 0, y: +y || 0 };
};

export const getFontSize = () => parseFloat(getComputedStyle(document.body).fontSize);

export const getWidth = elem => parseFloat(getComputedStyle(elem).width);
