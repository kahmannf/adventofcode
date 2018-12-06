import { Selector } from './../types/selector';
import { LinqOperator } from "../LinqOperator";
import { LinqObject } from "../LinqObject";
import { Linq } from "../..";
import { createIterable } from "../util/createIterable";

export function selectWithIndex<T, TResult>(selector: (x: T, index: number) => TResult): LinqOperator<T, LinqObject<TResult>> {
  
  return (source: LinqObject<T>) => Linq(createIterable(function* () {
    let index = 0;
    for (const val of source) {
      yield selector(val, index);
      index++;
    }
  }));
}