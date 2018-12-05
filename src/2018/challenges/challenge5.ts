import { Challenge } from './../../challenge';
import { Linq } from '../../Linq';
import { where, select, aggregate } from '../../Linq/operators';

export class Challenge5 implements Challenge {
  day = 5;
  
  solve(input: string): string {

    //input = "dabAcCaCBAcCcaDA";
    
    return this.getStrippedLength(input).toString();
  }
  solve2(input: string): string {
    return 'not executed';
    let minimum = Number.MAX_SAFE_INTEGER;

    for(let i = 65; i < 91; i++) {
      const length = this.getStrippedLength(this.removeAsciiLetter(i, input))

      if(length < minimum) {
        minimum = length;
      }
    }
    return minimum.toString();
  }

  getStrippedLength(input: string): number {
    while(true) {
      let length = input.length;

      input = this.reduceString(input);
      if(length === input.length)
        break;

    }
    
    return input.length;
  }

  reduceString(s: string): string {

    let last = s[0];

    let result = '';

    for(let i = 1; i < s.length; i++) {
      if(Math.abs(last.charCodeAt(0) - s.charCodeAt(i)) === 32) {
        last = '\t'
      } else {
        if(last !== '\t') {
          result += last;
        }
        last = s[i];

        if(i === s.length - 1) {
          result += s[i];
        }
      }
    }

    return result;
  }

  removeAsciiLetter(capitalCode: number, input: string): string {
    return Linq(input).pipe(
      select(x => x.charCodeAt(0)),
      where(x => x !== capitalCode && x !== capitalCode + 32),
      select(x => String.fromCharCode(x)),
      aggregate((pv, cv) => pv + cv, '')
    );
  }

}