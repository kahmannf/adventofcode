import { LinqObject } from './../LinqObject';
import { LinqOperator } from './../LinqOperator';

export function aggregate<T>(reducer: (previous: T, current: T) => T, initialValue: T = undefined): LinqOperator<T, T> {
  return (source: LinqObject<T>) => {
    let result: T = initialValue;
    for(const element of source) {
      result = reducer(result, element);
    }
    return result;
  }
}