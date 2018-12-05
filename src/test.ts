import { Linq, range } from './Linq';
import { select, where, selectMany, firstOrUndefined, take, takeWhile, concat } from './Linq/operators';
 
export function entry() {

  console.log('hi');
  const x = Linq(range(1, 3));

  const iterableTest = x.pipe(
    concat(Linq(range(4, 2))),
    select(x => x * x),
    selectMany(x => function*() { yield x; yield x; }())
  );

  const iterator1 = iterableTest[Symbol.iterator]();

  let element = iterator1.next();

  while(!element.done) {
    console.log(element.value);
    element = iterator1.next();
  }


  const iterator2 = iterableTest[Symbol.iterator]();

  element = iterator2.next();

  while(!element.done) {
    console.log(element.value);
    element = iterator2.next();
  }

  //console.log(iterable.pipe(firstOrUndefined(x => x > 17)));
  
}