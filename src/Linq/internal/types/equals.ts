export type Equals<T> = (obj1: T, obj2: T) => boolean;

export function defaultEquals<T>() { return (a: T, b: T) => a === b; } 
