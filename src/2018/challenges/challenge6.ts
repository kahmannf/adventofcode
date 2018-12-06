import { Challenge } from './../../challenge';
export class Challenge6 implements Challenge {
  day = 6;
  
  solve(input: string): string {
    const coords = input.split('\n').map(x => x.trim().split(',').map(x => parseInt(x.trim()))).map(x => ({ x: x[0], y: x[1] }));
    
    let xmin = Number.MAX_SAFE_INTEGER;
    let ymin = Number.MAX_SAFE_INTEGER;
    let xmax = Number.MIN_SAFE_INTEGER;
    let ymax = Number.MIN_SAFE_INTEGER;

    for(const coord of coords) {
      if(coord.x < xmin) {
        xmin = coord.x;
      }

      if(coord.y < ymin) {
        ymin = coord.y;
      }

      if(coord.x > xmax) {
        xmax = coord.x;
      }

      if(coord.y > ymax) {
        ymax = coord.y;
      }
    }
    
    const counts = coords.map(x => 0);

    for(let x = xmin; x <= xmax; x++) {
      for(let y = ymin; y <= ymax; y++) {

        let minDistance = Number.MAX_SAFE_INTEGER;
        let minIndex = -1;
        let multiple = false;

        for(let i = 0; i < coords.length; i++) {
          let distance = this.getDistance(coords[i], { x, y });
          if(distance === minDistance) {
            multiple = true;
          } else if(distance < minDistance) {
            minDistance = distance;
            minIndex = i;
            multiple = false;
          }
        }

        if(!multiple) {
          if(coords[minIndex].x === xmin || coords[minIndex].x === xmax || coords[minIndex].y === ymin || coords[minIndex].y === ymax) {
            counts[minIndex] = Infinity;
          } else {
            counts[minIndex]++;
          }
        }
      }
    }


    return (counts.filter(x => x !== Infinity).sort((a, b) => b - a)[0]).toString();
  }

  solve2(input: string): string {
    const maxDistanceExclusive = 10000;

    const coords = input.split('\n').map(x => x.trim().split(',').map(x => parseInt(x.trim()))).map(x => ({ x: x[0], y: x[1] }));

    let xmin = Number.MAX_SAFE_INTEGER;
    let ymin = Number.MAX_SAFE_INTEGER;
    let xmax = Number.MIN_SAFE_INTEGER;
    let ymax = Number.MIN_SAFE_INTEGER;

    for(const coord of coords) {
      if(coord.x < xmin) {
        xmin = coord.x;
      }

      if(coord.y < ymin) {
        ymin = coord.y;
      }

      if(coord.x > xmax) {
        xmax = coord.x;
      }

      if(coord.y > ymax) {
        ymax = coord.y;
      }
    }
    
    const validCoords = [];

    for(let x = xmin; x <= xmax; x++) {
      for(let y = ymin; y <= ymax; y++) {

        let distance = 0;

        for(let i = 0; i < coords.length; i++) {
          
          distance += this.getDistance(coords[i], { x, y });
        }

        if(distance < maxDistanceExclusive) {
          validCoords.push({x, y});
        }
      }
    }

    return validCoords.length.toString();

  }

  getDistance(a: Point, b: Point) {

    const diffX = Math.abs(a.x - b.x);
    const diffY = Math.abs(a.y -b.y);

    return diffX + diffY;
  }

}

interface Point {
  x: number;
  y: number;
}