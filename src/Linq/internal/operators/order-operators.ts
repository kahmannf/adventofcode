import { LinqObject } from './../LinqObject';
import { Comparer, defaultComparer } from './../types/comparer';
import { Selector } from './../types/selector';
import { LinqOperator } from '../LinqOperator';
import { Linq } from '../..';
import { createIterable } from '../util/createIterable';

export function orderBy<TElement, TKey>(
  keySelector: Selector<TElement, TKey>,
  comparer?: Comparer<TKey>
): LinqOperator<TElement, OrderedLinqObject<TElement>> {
  return (source: LinqObject<TElement>) => new OrderedLinqKeyObject<TElement, TKey>(
    source,
    keySelector,
    comparer,
    false
  );
}

export function orderByDesc<TElement, TKey>(
  keySelector: Selector<TElement, TKey>,
  comparer?: Comparer<TKey>
): LinqOperator<TElement, OrderedLinqObject<TElement>> {
  return (source: LinqObject<TElement>) => new OrderedLinqKeyObject<TElement, TKey>(
    source,
    keySelector,
    comparer,
    true
  );
}

export function thenBy<TElement, TKey>(
  keySelector: Selector<TElement, TKey>,
  comparer?: Comparer<TKey>
): LinqOperatorOrdered<TElement, OrderedLinqObject<TElement>> {
  return (source: OrderedLinqObject<TElement>) => source.createOrderedEnumerable(
    keySelector,
    comparer || defaultComparer(),
    false
  );
}

export function thenByDesc<TElement, TKey>(
  keySelector: Selector<TElement, TKey>,
  comparer?: Comparer<TKey>
): LinqOperatorOrdered<TElement, OrderedLinqObject<TElement>> {
  return (source: OrderedLinqObject<TElement>) => source.createOrderedEnumerable(
    keySelector,
    comparer || defaultComparer(),
    true
  );
}

export type LinqOperatorOrdered<TElement, TResult> = (source: OrderedLinqObject<TElement>) => TResult;


class Buffer<TElement> {

  readonly items: TElement[];
  readonly count: number;

  constructor(source: Iterable<TElement>) {
    this.items = [...source];
    this.count = this.items.length;
  }

  toArray() {
    return [...this.items];
  }
}

abstract class LinqObjectSorter<TElement> {

  abstract computeKeys(elements: TElement[], count: number);
  abstract compareKeys(index1: number, index2: number);

  sort(elements: TElement[], count: number): number[] {
    this.computeKeys(elements, count);
    const map: number[] = [];
    for (let i = 0; i < count; i++) map[i] = i;
    this.quickSort(map, 0, count - 1);
    return map;
  }

  quickSort(map: number[], left: number, right: number) {
    do {
      let i = left;
      let j = right;
      let x = map[i + ((j - i) >> 1)];
      do {
        while (i < map.length && this.compareKeys(x, map[i]) > 0) i++;
        while (j >= 0 && this.compareKeys(x, map[j]) < 0) j--;
        if (i > j) break;
        if (i < j) {
          const temp = map[i];
          map[i] = map[j];
          map[j] = temp;
        }
        i++;
        j--;
      } while (i <= j);
      if (j - left <= right - i) {
        if (left < j) this.quickSort(map, left, j);
        left = i;
      }
      else {
        if (i < right) this.quickSort(map, i, right);
        right = j;
      }
    } while (left < right);
  }

}

class LinqObjectKeySorter<TElement, TKey> extends LinqObjectSorter<TElement> {

  keys: TKey[];

  constructor(
    public keySelector: Selector<TElement, TKey>,
    public comparer: Comparer<TKey>,
    public descending: boolean,
    public next: LinqObjectSorter<TElement>
  ) {
    super();
  }

  computeKeys(elements: TElement[], count: number) {
    this.keys = [];
    for (let i = 0; i < count; i++) this.keys[i] = this.keySelector(elements[i]);
    if (this.next != null) this.next.computeKeys(elements, count);
  }

  compareKeys(index1: number, index2: number) {
    const c = this.comparer(this.keys[index1], this.keys[index2]);
    if (c == 0) {
      if (this.next == null) return index1 - index2;
      return this.next.compareKeys(index1, index2);
    }
    return this.descending ? -c : c;
  }


}

export interface OderedIterable<TElement> extends Iterable<TElement> {
  createOrderedEnumerable<TKey>(keySelector: Selector<TElement, TKey>, comparer: Comparer<TKey>, descending: boolean);
}

abstract class OrderedLinqObject<TElement> extends LinqObject<TElement> implements OderedIterable<TElement> {

  source: LinqObject<TElement>;

  abstract getLinqObjectSorter(next: LinqObjectSorter<TElement>): LinqObjectSorter<TElement>;

  [Symbol.iterator] = (): Iterator<TElement> => {

    const source = this.source;
    const _this = this as OrderedLinqObject<TElement>;

    return createIterable(function* () {
      const buffer = new Buffer<TElement>(source);

      if (buffer.count > 0) {
        const sorter = _this.getLinqObjectSorter(undefined);
        const map = sorter.sort(buffer.items, buffer.count);

        for (let i = 0; i < buffer.count; i++) yield buffer.items[map[i]]

      }

    })[Symbol.iterator]();
  }

  createOrderedEnumerable<TKey>(keySelector: Selector<TElement, TKey>, comparer: Comparer<TKey>, descending: boolean) {
    const result = new OrderedLinqKeyObject<TElement, TKey>(this.source, keySelector, comparer, descending);
    result.parent = this;
    return result;
  }

}

class OrderedLinqKeyObject<TElement, TKey> extends OrderedLinqObject<TElement> {

  parent: OrderedLinqObject<TElement>;

  constructor(
    source: LinqObject<TElement>,
    public keySelector: Selector<TElement, TKey>,
    public comparer: Comparer<TKey>,
    public descending: boolean
  ) {
    super(source);

    this.source = source;
    if (!this.comparer) {
      this.comparer = defaultComparer();
    }
  }

  getLinqObjectSorter(next: LinqObjectSorter<TElement>): LinqObjectSorter<TElement> {
    let sorter: LinqObjectSorter<TElement> = new LinqObjectKeySorter<TElement, TKey>(this.keySelector, this.comparer, this.descending, next);
    if (this.parent) sorter = this.parent.getLinqObjectSorter(sorter);
    return sorter;
  }

}
