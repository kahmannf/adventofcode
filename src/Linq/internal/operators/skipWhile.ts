import { LinqObject } from './../LinqObject';
import { Predicate } from './../types/predicate';
import { LinqOperator } from '../LinqOperator';
import { Linq } from '../..';
import { createIterable } from '../util/createIterable';
export function skipWhile<T>(predicate: Predicate<T>): LinqOperator<T, LinqObject<T>> {
  return (source: LinqObject<T>) => Linq(createIterable(function* () {
    const iterator = source[Symbol.iterator]();

    let element = iterator.next();

    while(!element.done && predicate(element.value)) { element = iterator.next(); };

    while(!element.done) {
      yield element.value;      
      element = iterator.next();
    }

  }))
}