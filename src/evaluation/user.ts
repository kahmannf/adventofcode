import { CompletionDayLevel } from './completion-day-level';

export interface User {
  name: string;
  stars: number;
  completion_day_level: CompletionDayLevel;
  id: string;
  local_score: number;
  global_score: number;
}