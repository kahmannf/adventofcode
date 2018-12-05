import { LinqOperator } from './../LinqOperator';
import { LinqObject, Linq } from '../..';
import { createIterable } from '../util/createIterable';
export function concat<T>(second: LinqObject<T>): LinqOperator<T, LinqObject<T>> {
  return (source: LinqObject<T>) => Linq(
    createIterable(function* () {
      for(const element of source) yield element;
      for(const element of second) yield element;
    })
  )
}