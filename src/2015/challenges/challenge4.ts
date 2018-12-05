import { Challenge } from './../../challenge';
import { createHash } from 'crypto';
export class Challenge4 implements Challenge {
  day = 4;
  
  solve(input: string): string {
    return "not executed";
    let hash = "";
    let i = -1;

    while(!hash.startsWith("00000"))
    {
        i++;
        hash = createHash('md5').update(input + i).digest('hex');
    }

    return i.toString();
  }

  solve2(input: string): string {
    return "not executed";
    let hash = "";
    let i = -1;

    while(!hash.startsWith("000000"))
    {
        i++;
        hash = createHash('md5').update(input + i).digest('hex');
    }

    return i.toString();
  }
}