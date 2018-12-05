import { LinqObject } from './../LinqObject';
import { LinqOperator } from "../LinqOperator";
import { Linq } from '../..';
import { createIterable } from '../util/createIterable';

export function skip<T>(count: number): LinqOperator<T, LinqObject<T>> {
  return (source: LinqObject<T>) => Linq(createIterable(function* () {
    for(const element of source) {
      if(count-- > 0) {
        continue;
      }
      yield element;
    }
  }))
}