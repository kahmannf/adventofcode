import { LinqObject } from './LinqObject';

export type LinqOperator<T, U> = (x: LinqObject<T>) => U;