import { Challenge } from './../../challenge';
export class Challenge1 implements Challenge {
  day = 1;
  
  solve(input: string): string {
    return (input.match(/\({1}/g).length - input.match(/\){1}/g).length).toString();
  }
  solve2(input: string): string {
    let x = 0;
    let i = 0;
    
    while(x != -1)
    {
        x = x + (input[i] == '(' ? 1 : -1);
        i++;
    }
    return i.toString();
  }

}