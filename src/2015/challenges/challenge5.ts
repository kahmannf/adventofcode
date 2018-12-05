import { Challenge } from './../../challenge';
import { Linq } from '../../Linq';
import { select, count, groupBy } from '../../Linq/operators';
export class Challenge5 implements Challenge {
  day = 5;

  solve(input: string): string {

    return Linq(input.split('\n')).pipe(
      select(x => x.trim()),
      count(x => this.isNiceString(x))
    ).toString();
  }
  solve2(input: string): string {
    return Linq(input.split('\n')).pipe(
      select(x => x.trim()),
      count(x => this.isNiceString2(x))
    ).toString();
  }

  isNiceString(s: string): boolean {
    s = s.toLowerCase().trim();

    const vowelCount = Linq(s).pipe(count(c => 'aeiou'.indexOf(c) !== -1));
    const notContainsForbidden = s.indexOf('ab') === -1 && s.indexOf('cd') === -1 && s.indexOf('pq') === -1 && s.indexOf('xy') === -1;

    let hasDoubleLetter = false

    for (let i = 0; i < s.length - 1; i++) {
      if (s[i] == s[i + 1]) {
        hasDoubleLetter = true;
        break;
      }
    }

    return vowelCount > 2 && hasDoubleLetter && notContainsForbidden;
  }

  isNiceString2(s: string): boolean
  {
      const arr1: string[] = [], arr2: string[] = [];

      for(let i = 0; i < s.length; i += 2)
      {
          if(i + 1 < s.length)
          arr1.push(s[i] + s[i + 1]);

          if(i + 2 < s.length)
          {
              arr2.push(s[i + 1] + s[i + 2]);
          }
      }

      let doubleLetters = this.checkForReapeatingDoubleLetters(arr1, arr2);

      if(!doubleLetters)
          doubleLetters = this.checkForReapeatingDoubleLetters(arr2, arr1);


      let hasSeperatedDoubleLetter = false;

      for (let i = 0; i < s.length - 2; i++)
      {
          if (s[i] == s[i + 2])
          {
              hasSeperatedDoubleLetter = true;
              break;
          }
      }

      return hasSeperatedDoubleLetter && doubleLetters;
  }

  checkForReapeatingDoubleLetters(arr1: string[], arr2: string[]): boolean {
    for (let i = 0; i < arr1.length; i++) {
      if (Linq(arr1).pipe(count(x => x == arr1[i])) > 1) {
        return true;
      }
      else {
        const countLocal = Linq(arr2).pipe(count(x => x === arr1[i]));

        if (countLocal > 1) {
          return true;
        }
        else if (countLocal == 1) {
          let index = arr2.indexOf(arr1[i]);
          if (index != i && index != i + 1) {
            return true;
          }
        }
      }
    }
    return false;
  }
}