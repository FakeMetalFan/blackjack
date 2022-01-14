export default <T extends Element>(elem: T, ...classes: string[]) => {
  elem.classList.add(...classes);

  return elem;
};
