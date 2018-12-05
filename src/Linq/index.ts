import { LinqObject } from "./internal/LinqObject";

export { LinqObject } from './internal/LinqObject';
export { range } from './internal/Range';


export function Linq<T>(base: Iterable<T>): LinqObject<T> {
  return LinqObject.Linq(base)
}

