const easeAnimationProgress = (progress: number) =>
  progress < 0.5
    ? 4 * progress ** 3
    : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

export default easeAnimationProgress;
