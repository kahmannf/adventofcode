import { LinqOperator } from './../LinqOperator';
import { Predicate } from "../types/predicate";
import { LinqObject } from '../LinqObject';
import { Linq } from '../../index';
import { createIterable } from '../util/createIterable';

export function where<T>(predicate: Predicate<T>): LinqOperator<T, LinqObject<T>> {
  
  return (source: LinqObject<T>) => Linq(createIterable(
    function* () {
      for (const val of source) {
        if(predicate(val)) {
          yield val;
        } 
      }
    })
  );
}
