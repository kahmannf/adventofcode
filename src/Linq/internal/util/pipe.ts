import { LinqOperator } from '../LinqOperator';
import { LinqObject } from '../LinqObject';

/* tslint:disable:max-line-length */
export function pipe<T>(): T;
export function pipe<T, A>(fn1: LinqOperator<T, A>): LinqOperator<T, A>;
export function pipe<T, A, B>(fn1: LinqOperator<T, A>, fn2: LinqOperator<A, B>): LinqOperator<T, B>;
export function pipe<T, A, B, C>(fn1: LinqOperator<T, A>, fn2: LinqOperator<A, B>, fn3: LinqOperator<B, C>): LinqOperator<T, C>;
export function pipe<T, A, B, C, D>(fn1: LinqOperator<T, A>, fn2: LinqOperator<A, B>, fn3: LinqOperator<B, C>, fn4: LinqOperator<C, D>): LinqOperator<T, D>;
export function pipe<T, A, B, C, D, E>(fn1: LinqOperator<T, A>, fn2: LinqOperator<A, B>, fn3: LinqOperator<B, C>, fn4: LinqOperator<C, D>, fn5: LinqOperator<D, E>): LinqOperator<T, E>;
export function pipe<T, A, B, C, D, E, F>(fn1: LinqOperator<T, A>, fn2: LinqOperator<A, B>, fn3: LinqOperator<B, C>, fn4: LinqOperator<C, D>, fn5: LinqOperator<D, E>, fn6: LinqOperator<E, F>): LinqOperator<T, F>;
export function pipe<T, A, B, C, D, E, F, G>(fn1: LinqOperator<T, A>, fn2: LinqOperator<A, B>, fn3: LinqOperator<B, C>, fn4: LinqOperator<C, D>, fn5: LinqOperator<D, E>, fn6: LinqOperator<E, F>, fn7: LinqOperator<F, G>): LinqOperator<T, G>;
export function pipe<T, A, B, C, D, E, F, G, H>(fn1: LinqOperator<T, A>, fn2: LinqOperator<A, B>, fn3: LinqOperator<B, C>, fn4: LinqOperator<C, D>, fn5: LinqOperator<D, E>, fn6: LinqOperator<E, F>, fn7: LinqOperator<F, G>, fn8: LinqOperator<G, H>): LinqOperator<T, H>;
export function pipe<T, A, B, C, D, E, F, G, H, I>(fn1: LinqOperator<T, A>, fn2: LinqOperator<A, B>, fn3: LinqOperator<B, C>, fn4: LinqOperator<C, D>, fn5: LinqOperator<D, E>, fn6: LinqOperator<E, F>, fn7: LinqOperator<F, G>, fn8: LinqOperator<G, H>, fn9: LinqOperator<H, I>): LinqOperator<T, I>;
export function pipe<T, A, B, C, D, E, F, G, H, I>(fn1: LinqOperator<T, A>, fn2: LinqOperator<A, B>, fn3: LinqOperator<B, C>, fn4: LinqOperator<C, D>, fn5: LinqOperator<D, E>, fn6: LinqOperator<E, F>, fn7: LinqOperator<F, G>, fn8: LinqOperator<G, H>, fn9: LinqOperator<H, I>, ...fns: LinqOperator<any, any>[]): LinqOperator<T, {}>;
/* tslint:enable:max-line-length */

export function pipe(...fns: Array<LinqOperator<any, any>>): LinqOperator<any, any> {
  return pipeFromArray(fns);
}

/** @internal */
export function pipeFromArray<T, R>(fns: Array<LinqOperator<T, R>>): LinqOperator<T, R> {
  if (!fns) {
    return a => a as any;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input: LinqObject<T>): R {
    return fns.reduce((prev: any, fn: LinqOperator<T, R>) => fn(prev), input as any);
  };
}