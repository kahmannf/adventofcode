import { LinqOperator } from './../LinqOperator';
import { Predicate } from './../types/predicate';
import { LinqObject } from '../..';
import { where } from './where';

export function count<T>(predicate?: Predicate<T>): LinqOperator<T, number> {
  if(predicate) {
    return (source: LinqObject<T>) => [...source.pipe(where(predicate))].length;
  } else {
    return (source: LinqObject<T>) => [...source].length;
  }
}