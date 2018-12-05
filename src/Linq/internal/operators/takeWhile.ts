import { LinqOperator } from "../LinqOperator";
import { LinqObject, Linq } from "../..";
import { Predicate } from "../types/predicate";
import { createIterable } from "../util/createIterable";

export function takeWhile<T>(predicate: Predicate<T>): LinqOperator<T, LinqObject<T>> {
  return (source: LinqObject<T>) => Linq(createIterable(function* () {
    for(const element of source) {
      if(!predicate(element)) break;
      yield element;
    }
  }));
}