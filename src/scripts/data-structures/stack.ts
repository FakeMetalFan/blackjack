export default abstract class<T> {
  items: T[] = [];

  push(item: T) {
    this.items.push(item);
  };

  pop = () => {
    return this.items.pop();
  };

  get size() {
    return this.items.length;
  }

  get peek() {
    return this.items[this.size - 1];
  }
}
