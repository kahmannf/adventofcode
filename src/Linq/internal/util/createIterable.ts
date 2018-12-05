export function createIterable<T>(generator: () => IterableIterator<T>): Iterable<T> {
  return {
    [Symbol.iterator]: generator
  };
}