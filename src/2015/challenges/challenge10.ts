import { Challenge } from "../../challenge";

export class Challenge10 implements Challenge {
  day: number = 10;
  
  solve(input: string): string {
    for(let i = 0; i < 40; i++) {
      input = this.next(input);
    }
    return input.length.toString();
  }
  solve2(input: string): string {
    return "not executed";
    for(let i = 0; i < 50; i++) {
      input = this.next(input);
    }
    return input.length.toString();
  }

  next(current: string): string {
    let next = "";

    let currentLetter = current[0];
    let count = 0;

    for(const character of current) {
      if(currentLetter === character) {
        count++;
      } else {
        next += count.toString() + currentLetter;
        count = 1;
        currentLetter = character;
      }
    }
    next += count.toString() + currentLetter;

    return next;
  }
}