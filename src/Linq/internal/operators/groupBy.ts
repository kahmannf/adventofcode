import { LinqObject } from './../LinqObject';
import { Equals } from './../types/equals';
import { Selector } from './../types/selector';
import { Linq } from '../..';
import { LinqOperator } from '../LinqOperator';
import { ArrayGrouping } from '../types/arrayGrouping';

export function groupBy<T, TGroupKey>(
  keySelector: Selector<T, TGroupKey>,
  equals?: Equals<TGroupKey>
  ): LinqOperator<T, LinqObject<ArrayGrouping<TGroupKey, T>>> {
  equals = equals || ((a: TGroupKey, b: TGroupKey) => a === b);

  return (source: LinqObject<T>) => Linq(function* () {
    
    const result: ArrayGrouping<TGroupKey, T>[] = [];

    for(const item of source) {
      const key = keySelector(item);
      let group: ArrayGrouping<TGroupKey, T> = result.find(x => equals(x.key, key));

      if(typeof group === 'undefined') {
        group = {
          key,
          values: []
        }

        result.push(group);
      }

      (group.values as T[]).push(item);
    }

    yield* result;
  }());
}