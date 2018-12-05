import { LinqObject } from './LinqObject';
import { Linq } from '../';
import { createIterable } from './util/createIterable';

export function fromObject<T>(obj: any, flavour: 'keys' | 'values' | 'key-value-pairs'): LinqObject<T> {
  return Linq(createIterable(function* () {
    switch (flavour) {
      case 'keys':
        for (const key in obj) {
          yield key;
        }
        break;
      case 'values':
        for (const key in obj) {
          yield obj[key];
        }
        break;
      case 'key-value-pairs':
        for (const key in obj) {
          yield { key, value: obj[key] };
        }
        break;
    }
  }))
}
