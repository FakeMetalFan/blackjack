import addClasses from './add-classes';

type Props = {
  classes?: string[];
};

export default <T extends HTMLElement>(tagName: string, {
  classes,
}: Props = {}) => {
  const elem = document.createElement(tagName);

  if (classes) {
    addClasses(elem, ...classes);
  }

  return elem as T;
};
