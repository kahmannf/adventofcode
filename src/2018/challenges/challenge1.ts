import { Challenge } from "../../challenge";

export class Challenge1 implements Challenge {
  solve(input: string): string {

    return input.split('\n').map(x => parseInt(x.trim())).reduce((x, y) => y + x ).toString();
  }
  solve2(input: string): string {
    
    return 'not executed';
    const reached = [0];

    let current = 0;

    while (true) {
      for(const freq of input.split('\n')) {
        const val = parseInt(freq.trim());
        current += val;
        if(reached.indexOf(current) !== -1) {
          return current.toString();
        } else {
          reached.push(current);
        }
      }
    }
  }
  day = 1;

  
}