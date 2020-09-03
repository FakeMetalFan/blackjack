import { easeWithCubicInOut } from './internals/cubic-in-out';

export const runAnimations = animations => new Promise(resolve => {
  const animationsWithFlags = animations.map(animation => ({ ...animation, hasStarted: false, hasEnded: false }));

  requestAnimationFrame(function tick() {
    if (!animationsWithFlags.some(({ hasEnded }) => !hasEnded)) return resolve();

    const now = Date.now();

    animationsWithFlags.forEach(animation => {
      const { start, end, onStart, onProgress, onEnd, hasStarted, hasEnded } = animation;

      if (hasEnded || now < start) return;
      if (!hasStarted) {
        animation.hasStarted = true;
        onStart && onStart();
      }

      onProgress && onProgress(easeWithCubicInOut((now - start) / (end - start)));

      if (now > end) {
        animation.hasEnded = true;
        onEnd && onEnd();
      }
    });

    requestAnimationFrame(tick);
  });
});
