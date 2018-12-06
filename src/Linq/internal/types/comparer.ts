export type Comparer<T> = (first: T, second: T) => number;

export function defaultComparer<T>() { return (a: T, b: T) => a === b ? 0 : a > b ? 1 : -1; } 
