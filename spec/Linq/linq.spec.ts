import { Linq, range, repeat } from '../../src/Linq'

describe('Linq creator functions', () => {

  describe('#Linq', () => {

    it('should return an empty iterator with empty array', () => {
      const iterator = Linq([]);

      let i = 0;

      for(const e of iterator) {
        i++;
      }

      expect(i).toBe(0);
    });


    it('should be the same as iterating over the array', () => {


      const arrays: any[][] = [
        [0, 1, 2, 3, 4],
        ["hello", "buhu", "test"],
        [{ salat: 'nice'}]
      ]

      for(const array of arrays) {
        
        const linq = Linq(array);
        const arrayIterator = array[Symbol.iterator]();
        const linqIterator = linq[Symbol.iterator]();

        let arrElement = arrayIterator.next();
        let linqElement = linqIterator.next();

        while(!arrElement.done || ! linqElement.done) {
          expect(linqElement.done).toBe(arrElement.done);
          expect(linqElement.value).toBe(arrElement.value);
          arrElement = arrayIterator.next();
          linqElement = linqIterator.next();
        }

        expect(linqElement.done).toBe(arrElement.done);
      }

    });

  });

  describe('#range', () => {

    it('should create a range from 0 - 9', () => {

      const iterator = range(0, 10)[Symbol.iterator]();

      for(let i = 0; i < 10; i++) {
        const element =  iterator.next();
        expect(element.done).toBeFalsy();
        expect(element.value).toBe(i);
      }

      expect(iterator.next().done).toBeTruthy();
    });

    it('should create a range from -9 to 0', () => {
      const iterator = range(-9, 10)[Symbol.iterator]();

      for(let i = -9; i < 1; i++) {
        const element =  iterator.next();
        expect(element.done).toBeFalsy();
        expect(element.value).toBe(i);
      }

      expect(iterator.next().done).toBeTruthy();
    });

    it('should throw an Error on invalid inputs', () => {

      const invalidInputs = [
        [10, -3],
        [100, -4],
        [-234, -200],
      ];

      
      for(const input of invalidInputs) {
        expect(() => range(input[0], input[1])).toThrow();
      }

    });

    it('should return an empty sequence on lenth 0', () => {
      expect(range(0, 0)[Symbol.iterator]().next().done).toBeTruthy();
    })
  });

  describe('#repeat', () => {

    it('should repeat anything correct number of times', () => {
      const repeats = ["test", 1, { nice: 'salat' }, undefined];
      const times = [2, 5, 100];

      for(const item of repeats) {
        for(const t of times) {
          const iterator = repeat(item, t)[Symbol.iterator]();

          for(let i = 0; i < t; i++) {
            const current = iterator.next();
            expect(current.done).toBeFalsy();
            expect(current.value).toBe(item);
          }

          expect(iterator.next().done).toBeTruthy();
        }
      }

    });

    it('should return an empty sequence on lenth 0', () => {
      expect(repeat({}, 0)[Symbol.iterator]().next().done).toBeTruthy();
    });

    it('should throw an error on invalid length', () => {
      expect(() => repeat({}, -1)).toThrow();
      expect(() => repeat('x', undefined)).toThrow();
    });

  });
});
