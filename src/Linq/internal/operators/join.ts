import { Comparer, defaultComparer } from './../types/comparer';
import { Selector } from './../types/selector';
import { LinqOperator } from './../LinqOperator';
import { LinqObject } from '../LinqObject';
import { Linq } from '../..';
import { createIterable } from '../util/createIterable';
import { groupBy } from './groupBy';
import { firstOrUndefined } from './firstOrUndefined';
import { first } from './first';

export function join<TOuter, TInner, TKey, TResult>(
  inner: LinqObject<TInner>,
  outerKeySelector: Selector<TOuter, TKey>,
  innerKeySelector: Selector<TInner, TKey>,
  resultSelector: (outer: TOuter, inner: TInner) => TResult,
  comparer?: Comparer<TKey>
): LinqOperator<TOuter, LinqObject<TResult>> {
  comparer = comparer || defaultComparer();
  return (source: LinqObject<TOuter>) => Linq(createIterable(
    function* () {
      const innerGroupings = inner.pipe(groupBy(innerKeySelector));

      for(const outerElement of source) {
        
        const g = innerGroupings.pipe(firstOrUndefined(x => comparer(x.key, outerKeySelector(outerElement)) === 0));
        
        if(g) {
          for(const innerElement of g.values) {
            yield resultSelector(outerElement, innerElement);
          }
        }
      }
    }
  ));
}