const getTransformValue = (elem: HTMLElement) => {
  const [, , , , x, y] = getComputedStyle(elem)
    .transform.replace(/[^\d\-.,]/g, '')
    .split(',');

  return { x: Number(x) || 0, y: Number(y) || 0 };
};

export default getTransformValue;
