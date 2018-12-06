import { LinqOperator } from './../LinqOperator';
import { Predicate } from './../types/predicate';
import { LinqObject } from '../..';
import { aggregate } from './aggregate';

export function count<T>(predicate?: Predicate<T>): LinqOperator<T, number> {
  predicate = predicate || (x => true);
  return (source: LinqObject<T>) => source.pipe(aggregate((pv, cv) => predicate(cv) ? ++pv : pv, 0));
  
}