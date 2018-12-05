import { Grouping } from "./grouping";

export interface ArrayGrouping<TGroupingKey, T> extends Grouping<TGroupingKey, T> {
  key: TGroupingKey;
  values: T[];
}
