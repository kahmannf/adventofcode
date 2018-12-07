import { Selector } from './../types/selector';
import { LinqObject } from './../LinqObject';
import { LinqOperator } from './../LinqOperator';
import { groupBy } from './groupBy';
import { select } from './select';
import { Equals, defaultEquals } from '../types/equals';

export function groupJoin<TOuter, TInner, TKey extends number | string | symbol, TResult>(
  inner: LinqObject<TInner>,
  outerKeySelector: Selector<TOuter, TKey>,
  innerKeySelector: Selector<TInner, TKey>,
  resultSelector: Selector<[TOuter, Iterable<TInner>], TResult>,
  equals?: Equals<TKey>): LinqOperator<TOuter, LinqObject<TResult>> {
    equals = equals || defaultEquals();
    return (source: LinqObject<TOuter>) => {
    const innerGrouping = inner.pipe(groupBy(innerKeySelector, equals)).toObject(x => x.key);
    
    return source.pipe(select(outer => resultSelector([outer, innerGrouping[outerKeySelector(outer)].values])));
  }
}