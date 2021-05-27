const bind = (
  target: unknown,
  propName: string,
  descriptor: PropertyDescriptor
) => ({
  get() {
    const value = descriptor.value.bind(this);

    Object.defineProperty(this, propName, {
      writable: true, // needed for jest's spy to work properly;
      value,
    });

    return value;
  },
});

export default bind;
