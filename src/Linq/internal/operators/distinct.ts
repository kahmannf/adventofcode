import { Equals } from './../types/equals';
import { LinqOperator } from './../LinqOperator';
import { LinqObject } from '../LinqObject';
import { Linq } from '../../index';

export function distinct<T>(equals?: Equals<T>): LinqOperator<T, LinqObject<T>> {
  const createIterator = (source: LinqObject<T>) => ({
    [Symbol.iterator]: (function* () {

      const all = []

      equals = equals || ((a: T, b: T) => a === b);

      for (const val of source) {
        
        if(!all.some(x => equals(x, val))) {
          all.push(val);
          yield val;
        } 
      }
    })
  });

  return (source: LinqObject<T>) => Linq(createIterator(source));
}
