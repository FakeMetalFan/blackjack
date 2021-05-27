import easeAnimation from './ease-animation';

export interface Animation {
  start: number;
  end: number;
  onStart?: () => void;
  onProgress?: (progress: number) => void;
  onEnd?: () => void;
}

const animate = (animations: Animation[]) =>
  new Promise<void>((resolve) => {
    const animationsWithFlags = animations.map((animation) => ({
      ...animation,
      hasStarted: false,
      hasEnded: false,
    }));

    requestAnimationFrame(function f() {
      const haveAllEnded = !animationsWithFlags.some(
        ({ hasEnded }) => !hasEnded
      );

      if (haveAllEnded) {
        resolve();
        return;
      }

      const now = Date.now();

      animationsWithFlags.forEach((animation) => {
        const { start, end, onStart, onProgress, onEnd, hasStarted, hasEnded } =
          animation;

        if (hasEnded || now < start) {
          return;
        }

        if (!hasStarted) {
          /* eslint-disable no-param-reassign */
          animation.hasStarted = true;

          onStart?.();
        }

        onProgress?.(easeAnimation((now - start) / (end - start)));

        if (now > end) {
          animation.hasEnded = true;

          onEnd?.();
        }
      });

      requestAnimationFrame(f);
    });
  });

export default animate;
