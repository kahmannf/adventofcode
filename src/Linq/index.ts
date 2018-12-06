import { LinqObject } from "./internal/LinqObject";

export { LinqObject } from './internal/LinqObject';
export { range } from './internal/range';
export { repeat } from './internal/repeat';
export { fromObject } from './internal/fromObject';
export { Grouping } from './internal/types/grouping';

export function Linq<T>(base: Iterable<T>): LinqObject<T> {
  return LinqObject.Linq(base)
}

