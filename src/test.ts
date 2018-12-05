import { Linq, range } from './Linq';
import { select, where, selectMany, firstOrUndefined, take, takeWhile, concat, skip, skipWhile } from './Linq/operators';
 
export function entry() {

  console.log('hi');
  const x = Linq(range(1, 3));

  let iterableTest = x.pipe(
    select(x => x * x),
    selectMany(x => function*() { yield x; yield x; }()),
  );

  iterableTest = iterableTest.pipe(concat(iterableTest));

  const iterator1 = iterableTest[Symbol.iterator]();

  let element = iterator1.next();

  while(!element.done) {
    console.log(element.value);
    element = iterator1.next();
  }

  console.log('-'.repeat(60));

  const iterator2 = iterableTest[Symbol.iterator]();

  element = iterator2.next();

  while(!element.done) {
    console.log(element.value);
    element = iterator2.next();
  }

  //console.log(iterable.pipe(firstOrUndefined(x => x > 17)));
  
}