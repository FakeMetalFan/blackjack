export const bind = (target, propName, descriptor) => ({
  get() {
    const value = descriptor.value.bind(this);

    Object.defineProperty(this, propName, { value, writable: true }); // writable: true -> for unit tests sake;

    return value;
  },
});
