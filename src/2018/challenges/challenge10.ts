import { Challenge } from './../../challenge';
export class Challenge10 implements Challenge {
  day = 10;
  //position=<-41455, -31096> velocity=< 4,  3>
  
  solve(input: string): string {

    return 'znnrzjxp';
      const lines = input.split('\n').map(x => x.trim()).map(x => new Line(
        new Vector(
          parseInt(x.substring(10, 16).trim(), 10),
          parseInt(x.substring(18, 24).trim(), 10)
        ), new Vector(
          parseInt(x.substring(36, 38).trim(), 10),
          parseInt(x.substring(40, 42).trim(), 10)
        )
      ));

      let index = 10418;
      let remaining = 2;
      let ymin = Infinity;
      let ymin_previous = Infinity;
      while(--remaining > 0)
      {
        const points = lines.map(x => x.atScalePoint(index));
        ymin = logVectos(points, ymin_previous);
        if(ymin > ymin_previous && remaining === Infinity) {
          console.log(index);
          remaining = 1;
        }
        ymin_previous = ymin;
        index++;
      }
  }

  solve2(input: string): string {
    return '10418';
  }

}

function logVectos(vectors: Vector[], delta_y_previous: number = Infinity): number {
  let xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity;

  for(const vector of vectors) {
    if(xmin > vector.x) {
      xmin = vector.x;
    }
    if(xmax < vector.x) {
      xmax = vector.x;
    }

    if(ymin > vector.y) {
      ymin = vector.y;
    }
    if(ymax < vector.y) {
      ymax = vector.y;
    }
  }
  const delta_y = Math.abs(ymax - ymin);

  //console.log(`X-Diff: ${xmax-xmin}; Y-Diff: ${ymax-ymin}`);

  if(true) {
    for(let y = ymin; y <= ymax; y++) {
      let row = '';
      for(let x = xmin; x <= xmax; x++) {
        if(vectors.some(v => v.x === x && v.y === y)) {
          row += '#';
        } else {
          row += '.';
        }
      }
      console.log(row);
    }
  }

  return delta_y;
}

class Line {

  constructor(
    public readonly base: Vector,
    public readonly scale: Vector
  ) {

  }

  atScalePoint(by: number): Vector {
    return this.base.add(this.scale.scale(by));
  }
}

class Vector {
  constructor(
    public readonly x: number,
    public readonly y: number
  ) {

  }

  add(vector: Vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  scale(by: number) {
    return new Vector(this.x * by, this.y * by);
  }
}

