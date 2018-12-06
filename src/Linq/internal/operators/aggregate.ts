import { LinqObject } from './../LinqObject';
import { LinqOperator } from './../LinqOperator';

export function aggregate<T, TResult>(reducer: (previous: TResult, current: T) => TResult, initialValue: TResult = undefined): LinqOperator<T, TResult> {
  return (source: LinqObject<T>) => {
    let result: TResult = initialValue;
    for(const element of source) {
      result = reducer(result, element);
    }
    return result;
  }
}