import { Challenge } from './../../challenge';
import { Linq } from '../../Linq';
import { select, selectMany, count, aggregate } from '../../Linq/operators';

export class Challenge6 implements Challenge {
  day = 6;
  
  solve(input: string): string {
    try {
      const grid: boolean[][] = []
      for(const command of this.parseCommands(input)) {
        this.effect(grid, command, this.effectCell);
      }

      
      
      return Linq(grid).pipe(selectMany(x => x ||[]), count(x => x)).toString();
    } catch(error) {
      console.log(error);
      throw error;

    }
  }
  solve2(input: string): string {
    try {
      const grid: number[][] = []
      for(const command of this.parseCommands(input)) {
        this.effect(grid, command, this.effectCell2);
      }
      return Linq(grid).pipe(selectMany(x => x || []), aggregate((pv, cv) => pv + (cv || 0), 0)).toString();
    } catch(error) {
      console.log(error);
      throw error;

    }
  }

  parseCommands(input: string): Iterable<Command> {
    return Linq(input.split('\n')).pipe(
      select<string, Command>(x => {
        x = x.trim();

        const split = x.split(' ');

        if(x.indexOf('toggle') !== -1) {
          return {
            action: 'toggle',
            corner1: this.getPoint(split[1]),
            corner2: this.getPoint(split[3])
          }
        } else  {
          return {
            action: x.indexOf('on') !== -1 ? 'on' : 'off',
            corner1: this.getPoint(split[2]),
            corner2: this.getPoint(split[4])
          }
        }
      }),
    );
  }

  effect<T>(grid: T[][], command: Command, effectCell: (grid: T[][], action: Action, x:  number, y: number) => void) {
    for(let x = command.corner1.x; x <= command.corner2.x; x++) {
      if(!grid[x]) grid[x] = [];
      for(let y = command.corner1.y; y <= command.corner2.y; y++) {
        
        effectCell(grid, command.action, x, y);
      }
    }
  }

  effectCell(grid: boolean[][], status: Action, x: number, y: number) {
    grid[x][y] = (() => {
      switch(status) {
        case 'on':
          return true;
        case 'off':
          return false;
        case 'toggle':
          return !grid[x][y];
      }
    })();
  }

  effectCell2(grid: number[][], status: Action, x: number, y: number) {
    
    switch(status) {
      case 'on':
        if(!grid[x][y]) {
          grid[x][y] = 1;
        } else {
          grid[x][y]++;
        }
        break;
      case 'off':
        if(!grid[x][y]) {
          grid[x][y] = 0;
        } else {
          grid[x][y]--;
        }
        break;
      case 'toggle':
        if(!grid[x][y]) {
          grid[x][y] = 2;
        } else {
          grid[x][y] += 2;
        }
        break;
    }
  
  }

  getPoint(s: string): Point {
    const split = s.split(',');
    return {
      x: parseInt(split[0]),
      y: parseInt(split[1])
    }
  }
}


interface Point {
  x: number;
  y: number;
}

type Action = 'on' | 'off' | 'toggle';

interface Command {
  corner1: Point;
  corner2: Point;
  action: Action;
}