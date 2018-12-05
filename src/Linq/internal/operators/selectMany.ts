import { LinqObject } from './../LinqObject';
import { LinqOperator } from "../LinqOperator";
import { Linq } from '../..'
import { createIterable } from '../util/createIterable';

export function selectMany<T, TResult>(selector: (input: T) => Iterable<TResult>) : LinqOperator<T, LinqObject<TResult>> {

  return (source: LinqObject<T>) => {
    return Linq(createIterable(function* () {
        for(const element of source) {
          for(const subElement of selector(element)) {
            yield subElement;
          }
        }
      })
    );
  }

}