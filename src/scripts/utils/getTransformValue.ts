const getTransformValue = (elem: Element) => {
  const [, , , , x = 0, y = 0] =
    getComputedStyle(elem)
      .transform.split('(')[1]
      ?.split(')')[0]
      .split(',')
      .map(Number) ?? [];

  return { x, y };
};

export default getTransformValue;
