interface AnimationParams {
  delay?: number;
  duration?: number;
  onStart?: () => void;
  onProgress?: (progress: number) => void;
  onEnd?: () => void;
}

const createAnimation = ({
  delay = 0,
  duration = 0,
  onStart,
  onProgress,
  onEnd,
}: AnimationParams) => {
  const start = delay + Date.now();

  return { start, onStart, onProgress, onEnd, end: start + duration };
};

export default createAnimation;
