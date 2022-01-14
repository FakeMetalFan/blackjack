export default <T extends HTMLElement>(tagName: string) =>
  document.createElement(tagName) as T;
