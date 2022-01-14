type AnimationProps = {
  delay?: number;
  duration?: number;
  onStart?: () => void;
  onProgress?: (calculateStep: (from: number, to: number) => number) => void;
  onEnd?: () => void;
};
