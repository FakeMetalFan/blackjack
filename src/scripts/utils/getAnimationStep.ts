const getAnimationStep = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

export default getAnimationStep;
