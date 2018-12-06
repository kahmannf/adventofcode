import { LinqOperator as LO } from "./LinqOperator";
import { pipeFromArray } from "./util/pipe";

export class LinqObject<T> implements Iterable<T> {
  constructor(
    private base: Iterable<T>
  ) {
  }

  static Linq<T>(base: Iterable<T>) {
    return new LinqObject(base);
  }

  [Symbol.iterator]: () => Iterator<T> = () => this.base[Symbol.iterator]();


  /* tslint:disable:max-line-length */
  pipe(): LinqObject<T>;
  pipe<A>(op1: LO<T, A>): A;
  pipe<A, B>(op1: LO<T, LinqObject<A>>, op2: LO<A, B>): B;
  pipe<A, B, C>(op1: LO<T, LinqObject<A>>, op2: LO<A, LinqObject<B>>, op3: LO<B, C>): C;
  pipe<A, B, C, D>(op1: LO<T, LinqObject<A>>, op2: LO<A, LinqObject<B>>, op3: LO<B, LinqObject<C>>, op4: LO<C, D>): D;
  pipe<A, B, C, D, E>(op1: LO<T, LinqObject<A>>, op2: LO<A, LinqObject<B>>, op3: LO<B, LinqObject<C>>, op4: LO<C, LinqObject<D>>, op5: LO<D, E>): E;
  pipe<A, B, C, D, E, F>(op1: LO<T, LinqObject<A>>, op2: LO<A, LinqObject<B>>, op3: LO<B, LinqObject<C>>, op4: LO<C, LinqObject<D>>, op5: LO<D, LinqObject<E>>, op6: LO<E, F>): F;
  pipe<A, B, C, D, E, F, G>(op1: LO<T, LinqObject<A>>, op2: LO<A, LinqObject<B>>, op3: LO<B, LinqObject<C>>, op4: LO<C, LinqObject<D>>, op5: LO<D, LinqObject<E>>, op6: LO<E, LinqObject<F>>, op7: LO<F, G>): G;
  pipe<A, B, C, D, E, F, G, H>(op1: LO<T, LinqObject<A>>, op2: LO<A, LinqObject<B>>, op3: LO<B, LinqObject<C>>, op4: LO<C, LinqObject<D>>, op5: LO<D, LinqObject<E>>, op6: LO<E, LinqObject<F>>, op7: LO<F, LinqObject<G>>, op8: LO<G, H>): H;
  pipe<A, B, C, D, E, F, G, H, I>(op1: LO<T, LinqObject<A>>, op2: LO<A, LinqObject<B>>, op3: LO<B, LinqObject<C>>, op4: LO<C, LinqObject<D>>, op5: LO<D, LinqObject<E>>, op6: LO<E, LinqObject<F>>, op7: LO<F, LinqObject<G>>, op8: LO<G, LinqObject<H>>, op9: LO<H, I>): I;
  pipe<A, B, C, D, E, F, G, H, I>(op1: LO<T, LinqObject<A>>, op2: LO<A, LinqObject<B>>, op3: LO<B, LinqObject<C>>, op4: LO<C, LinqObject<D>>, op5: LO<D, LinqObject<E>>, op6: LO<E, LinqObject<F>>, op7: LO<F, LinqObject<G>>, op8: LO<G, LinqObject<H>>, op9: LO<H, LinqObject<I>>, ...operations: LO<any, any>[]): {};
  /* tslint:enable:max-line-length */
  
  pipe(...operations: LO<any, any>[]): any {
    return pipeFromArray(operations)(this);
  }
  
}
