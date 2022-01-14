export default <T extends HTMLElement>(elem: T) => {
  const {
    m41,
    m42,
  } = new WebKitCSSMatrix(getComputedStyle(elem).transform);

  return {
    x: Number(m41) || 0,
    y: Number(m42) || 0,
  };
};
