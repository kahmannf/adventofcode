import { LinqObject } from './Linq/internal/LinqObject';
import { Linq, range, repeat } from './Linq';
import { select, where, reverse, selectMany, firstOrUndefined, take, takeWhile, concat, skip, skipWhile, orderByDesc, orderBy, thenBy } from './Linq/operators';

export function entry() {

  // const x = Linq(range(5, 3));

  // let iterableTest: LinqObject<number> = x.pipe(
  //   select(x => x * x),
  //   selectMany(x => function*() { yield x; yield x; }())
  // );

  // // iterableTest = iterableTest.pipe(concat(iterableTest));

  // const iterator1 = iterableTest[Symbol.iterator]();

  // let element = iterator1.next();

  // while(!element.done) {
  //   console.log(element.value);
  //   element = iterator1.next();
  // }

  // console.log('-'.repeat(60));

  // const iterator2 = iterableTest[Symbol.iterator]();

  // element = iterator2.next();

  // while(!element.done) {
  //   console.log(element.value);
  //   element = iterator2.next();
  // }

  // //console.log(iterable.pipe(firstOrUndefined(x => x > 17)));

  // console.log('-'.repeat(60));
  
  let odd = true;

  const points: LinqObject<Point> = repeat({ x: 0, y: 0 }, 10, (point) => {
    const result = {...point};

    if(!odd) {
      result.x += 2;
    }
    result.y--;

    odd = !odd 

    return result;
  })

  const piped = points.pipe(
    orderByDesc(p => p.x),
    thenBy(p => p.y)
  );

  for(const point of piped) {
    logPoint(point);
  }

  console.log('-'.repeat(60));

  for(const point of piped.pipe(reverse())) {
    logPoint(point);
  }
}

function logPoint(point: Point) {
  console.log(`x: ${point.x} y: ${point.y}`)
}

interface Point {
  x: number;
  y: number;
}