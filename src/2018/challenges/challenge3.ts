import { Challenge } from './../../challenge';
export class Challenge3 implements Challenge {
  day = 3;
  solve(input: string): string {

    return this.countOverlaps(input.split('\n')).toString();
  }
  solve2(input: string): string {
    return this.getNotOverlaping(input.split('\n'));
  }


  countOverlaps(lines: string[]): number {

    const area: number[][] = [];

    for (const line of lines) {
      const splitted = line.trim().split(' ');

      const offsets: number[] = splitted[2].substring(0, splitted[2].length - 1).split(',').map(x => parseInt(x, 10));


      const dimensions: number[] = splitted[3].split('x').map(x => parseInt(x, 10));

      this.addArea(
        area,
        offsets[0],
        offsets[1],
        dimensions[0],
        dimensions[1]
      );
    }

    let count = 0;

    for (const sub of area) {
      if (sub) {
        for (const fieldCount of sub) {
          if (fieldCount > 1) {
            count++;
          }
        }
      }
    }

    return count;

  }

  getNotOverlaping(lines: string[]): string {
    const area: number[][] = [];

    for (const line of lines) {
      const splitted = line.trim().split(' ');

      const offsets: number[] = splitted[2].substring(0, splitted[2].length - 1).split(',').map(x => parseInt(x, 10));


      const dimensions: number[] = splitted[3].split('x').map(x => parseInt(x, 10));

      this.addArea(
        area,
        offsets[0],
        offsets[1],
        dimensions[0],
        dimensions[1]
      );
    }

    for (const line of lines) {
      const splitted = line.trim().split(' ');

      const offsets: number[] = splitted[2].substring(0, splitted[2].length - 1).split(',').map(x => parseInt(x, 10));


      const dimensions: number[] = splitted[3].split('x').map(x => parseInt(x, 10));

      if (!this.addArea(
        area,
        offsets[0],
        offsets[1],
        dimensions[0],
        dimensions[1]
      )) {
        return splitted[0].substring(1);
      }
    }
  }

  addArea(
    area: number[][],
    xOffset: number,
    yOffset: number,
    width: number,
    height: number,
  ): boolean {
    let overlaps = false;
    for (let x = xOffset; x < xOffset + width; x++) {
      for (let y = yOffset; y < yOffset + height; y++) {
        if (this.countUp(area, x, y)) {
          overlaps = true;
        }
      }
    }
    return overlaps;
  }

  countUp(area: number[][], x: number, y: number): boolean {

    let largeThan2 = false;

    if (!area[x]) {
      area[x] = [];
    }

    if (!area[x][y]) {
      area[x][y] = 1;
    } else {
      area[x][y]++;

      if (area[x][y] > 2) {
        largeThan2 = true;
      }
    }

    return largeThan2;
  }

}


