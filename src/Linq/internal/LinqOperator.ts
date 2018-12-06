import { LinqObject } from './LinqObject';

export type LinqOperator<T, TResult> = (source: LinqObject<T>) => TResult;
