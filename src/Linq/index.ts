import { LinqObject } from "./internal/LinqObject";

export { LinqObject } from './internal/LinqObject';
export { range } from './internal/Range';
export { fromObject } from './internal/fromObject';

export function Linq<T>(base: Iterable<T>): LinqObject<T> {
  return LinqObject.Linq(base)
}

