import { LinqOperator } from "../LinqOperator";
import { LinqObject } from "../LinqObject";
import { Linq } from "../..";
import { createIterable } from "../util/createIterable";

export function take<T>(count: number): LinqOperator<T, LinqObject<T>> {
  return (source: LinqObject<T>) => Linq(createIterable(function* () {
    if(count > 0) {
      for(const element of source) {
        yield element;
        if(--count === 0) break;
      }
    }
  }));
}