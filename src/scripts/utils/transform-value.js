export const getTransformValue = elem => {
  const [, , , , x, y] = getComputedStyle(elem).getPropertyValue('transform').replace(/[^0-9\-.,]/g, '').split(',');

  return { x: +x || 0, y: +y || 0 };
};
