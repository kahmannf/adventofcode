import { Challenge } from './../../challenge';
import { Linq } from '../../Linq';
import { count, distinct } from '../../Linq/operators';

export class Challenge3 implements Challenge {
  day = 3;
  equals = (x: SantaPoint, y: SantaPoint) => x.x === y.x && x.y === y.y;

  solve(input: string): string {
    
    return Linq(this.getPoints(input)).pipe(
      distinct(this.equals),
      count()
      ).toString();
  }
  solve2(input: string): string {
    return Linq(this.getPoints2(input)).pipe(
      distinct(this.equals),
      count()
      ).toString();
  }

  getPoints(input: string): IterableIterator<SantaPoint> {
    let current: SantaPoint = { x: 0, y: 0 };

    const next = this.getNextPosition;

    return function* () {
      yield current;

      for (let character of input) {
        current = next(current, character);
        yield current;
      }
    }()
  }

  getPoints2(input: string): IterableIterator<SantaPoint> {
    let current: SantaPoint = { x: 0, y: 0 };
    let currentRobo: SantaPoint = { x: 0, y: 0 };

    let robo = false;

    

    const next = this.getNextPosition;

    return function* () {
      yield current;
      yield currentRobo;

      for (let character of input) {

        if(robo) {
          currentRobo = next(currentRobo, character);
          yield currentRobo;
        } else {
          current = next(current, character);
          yield current;
        }

        robo = !robo;
      }
    }()
  }

  

  getNextPosition(current: SantaPoint, character: string): SantaPoint {

    switch (character) {
      case 'v':
        return {
          x: current.x,
          y: --current.y
        };
      case '^':
        return {
          x: current.x,
          y: ++current.y
        };
      case '>':
        return {
          x: ++current.x,
          y: current.y
        };
      case '<':
        return {
          x: --current.x,
          y: current.y
        };
      default:
        throw Error('dunno');
    }
  }
}

interface SantaPoint {
  x: number;
  y: number;
}