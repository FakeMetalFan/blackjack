export default <T extends HTMLElement>(elem: T) => {
  const {
    m41,
    m42,
  } = new WebKitCSSMatrix(getComputedStyle(elem).transform);

  return {
    x: m41,
    y: m42,
  };
};
