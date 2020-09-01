export const getAnimation = ({ delay = 0, duration = 0, onStart, onProgress, onEnd }) => {
  const start = delay + Date.now();

  return { start, onStart, onProgress, onEnd, end: duration + start };
};
