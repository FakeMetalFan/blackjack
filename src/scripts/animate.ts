export interface AnimationConfig {
  delay?: number;
  duration?: number;
  onStart?: () => void;
  onProgress?: (calculateStep: (from: number, to: number) => number) => void;
  onEnd?: () => void;
}

const createAnimation = (config: AnimationConfig) => {
  const { delay = 0, duration = 0 } = config;
  const start = delay + Date.now();

  return {
    ...config,
    start,
    end: start + duration,
    hasStarted: false,
    hasEnded: false,
  };
};

const easeCubicInOut = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

const animate = (...animationsConfigs: AnimationConfig[]) =>
  new Promise<void>((resolve) => {
    const animations = animationsConfigs.map(createAnimation);

    const onFrame = () => {
      const now = Date.now();
      const pendingAnimations = animations.filter(
        ({ hasEnded, start }) => !hasEnded && start <= now
      );

      if (pendingAnimations.length) {
        pendingAnimations.forEach((animation) => {
          const { start, end, onStart, onProgress, onEnd, hasStarted } =
            animation;

          if (!hasStarted) {
            /* eslint-disable no-param-reassign */
            animation.hasStarted = true;

            onStart?.();
          }

          const t = (now - start) / (end - start);

          onProgress?.(
            (from, to) => from + (to - from) * easeCubicInOut(t < 1 ? t : 1)
          );

          if (now >= end) {
            animation.hasEnded = true;

            onEnd?.();
          }
        });

        requestAnimationFrame(onFrame);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(onFrame);
  });

export default animate;
