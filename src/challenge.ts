export interface Challenge {
  readonly day: number;
  readonly test?: boolean;
  solve(input: string): string;
  solve2(input: string): string;
}