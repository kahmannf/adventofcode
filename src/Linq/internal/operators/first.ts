import { Predicate } from './../types/predicate';
import { LinqOperator } from './../LinqOperator';
import { LinqObject } from '../LinqObject';

export function first<T>(predicate?: Predicate<T>): LinqOperator<T, T> {
  return (source: LinqObject<T>) => {

    predicate = predicate || (x => true);

    const iterator = source[Symbol.iterator]();

    let element = iterator.next();

    while(!element.done) {
      if(predicate(element.value)) {
        return element.value;
      }
      element = iterator.next();
    }
    
    throw new Error('No element matched the predicate');
  }
}