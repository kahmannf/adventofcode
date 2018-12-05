import { Selector } from './../types/selector';
import { LinqOperator } from "../LinqOperator";
import { LinqObject } from "../LinqObject";
import { Linq } from "../..";
import { createIterable } from "../util/createIterable";

export function select<T, TResult>(selector: Selector<T, TResult>): LinqOperator<T, LinqObject<TResult>> {
  
  return (source: LinqObject<T>) => Linq(createIterable(function* () {
    for (const val of source) {
      yield selector(val);
    }
  }));
}