import { Challenge } from './../../challenge';
export class Challenge2 implements Challenge {
  day = 2;

  solve(input: string): string {

    let twos = 0;
    let threes = 0;

    const ids = input.split('\n');

    for (const id of ids) {
      const counted = this.check(id.trim());
      twos += counted[0] ? 1 : 0;
      threes += counted[1] ? 1 : 0;
    }
    return (twos * threes).toString();
  }

  solve2(input: string): string {

    const ids = input.split('\n');

    for (let i = 0; i < ids.length; i++) {
      for (let j = i; j < ids.length; j++) {

        let diff = false;
        let diffPosition = -1;
        for (let x = 0; x < ids[i].length; x++) {
          if (ids[i][x] !== ids[j][x]) {
            if (diff) {
              diff = false;
              break;
            } else {
              diff = true;
              diffPosition = x;
            }
          }
        }
        if (diff) {
          return ids[i].substring(0, diffPosition) + ids[i].substring(diffPosition + 1);
        }


      }
    }

  }


  check(id: string): [boolean, boolean] {
    const map: { [x in string]: number } = {};

    for (const char of id) {
      if (map[char]) {
        map[char]++;
      } else {
        map[char] = 1;
      }
    }

    const values = Object.keys(map).map(x => map[x]);

    const twos = values.filter(x => x === 2).length;
    const threes = values.filter(x => x === 3).length;

    return [twos > 0, threes > 0];
  }
}
