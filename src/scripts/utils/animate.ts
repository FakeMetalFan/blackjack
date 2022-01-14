const createAnimation = (props: AnimationProps) => {
  const {
    delay = 0,
    duration = 0,
  } = props;
  const start = delay + Date.now();

  return {
    ...props,
    start,
    end: start + duration,
    started: false,
    ended: false,
  };
};

const easeCubicInOut = (t: number) =>
  t < 0.5
    ? 4 * t ** 3
    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

export default (...props: AnimationProps[]) =>
  new Promise<void>((resolve) => {
    const animations = props.map(createAnimation);

    const animate = () => {
      const now = Date.now();
      const pendingAnimations = animations.filter(({
        ended,
        start,
      }) => !ended && start <= now);

      if (pendingAnimations.length) {
        pendingAnimations.forEach((animation) => {
          const {
            started,
            onStart,
            onProgress,
            start,
            end,
            onEnd,
          } = animation;

          if (!started) {
            animation.started = true;

            onStart?.();
          }

          const t = (now - start) / (end - start);

          onProgress?.(
            (from, to) => from + (to - from) * easeCubicInOut(t < 1 ? t : 1),
          );

          if (now >= end) {
            animation.ended = true;

            onEnd?.();
          }
        });

        requestAnimationFrame(animate);

        return;
      }

      resolve();
    };

    requestAnimationFrame(animate);
  });
