import { LinqOperator } from './../LinqOperator';
import { LinqObject } from '../LinqObject';
import { Linq } from '../..';

export function reverse<T>(): LinqOperator<T, LinqObject<T>> {
  return (source: LinqObject<T>) => Linq(function* () {
    yield* [...source].reverse();
  }())
}