export interface Challenge {
  readonly day: number; 
  solve(input: string): string;
  solve2(input: string): string;
}