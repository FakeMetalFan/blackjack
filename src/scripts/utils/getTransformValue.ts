const getTransformValue = (elem: Element) => {
  const [a = 0, b = 0, , , x = 0, y = 0] =
    getComputedStyle(elem)
      .transform.split('(')[1]
      ?.split(')')[0]
      .split(',')
      .map(Number) ?? [];

  return { x, y, deg: Math.round((Math.atan2(b, a) * 180) / Math.PI) };
};

export default getTransformValue;
