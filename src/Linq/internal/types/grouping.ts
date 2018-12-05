export interface Grouping<TGroupKey, T> { 
  key: TGroupKey,
  values: Iterable<T>
}
