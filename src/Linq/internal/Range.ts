export function range(start: number, length: number): Iterable<number> {

  if(length < 0) {
    throw new Error('The \"length\"-parameter must be larger than zero');
  }

  return {
    [Symbol.iterator]: function* () {
      const totalLength = start + length;
      for(let i = start; i < totalLength; i++) {
        yield i;
      }
    }
  }
}
