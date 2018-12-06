import { Linq, LinqObject } from '../';
import { createIterable } from './util/createIterable';

export function repeat<T>(start: T, count: number, nextFactory?: (previous: T) => T): LinqObject<T> {
  if((!count && count !== 0) || count < 0) throw new Error('\"count\" must be zero or larger');
  
  nextFactory = nextFactory || (x => x);

  return Linq(createIterable(function* () {
    
    let current = start;
    
    for(let i = 0; i < count; i ++) {
      yield current;
      if(i < count) {
        current = nextFactory(current);
      }
    }
  }));
}