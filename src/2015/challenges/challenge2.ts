import { Challenge } from './../../challenge';
export class Challenge2 implements Challenge {
  day = 2;
  
  solve(input: string): string {
    
    const dimensions = this.getDimensions(input);

    const smallest = (x, y ,z) => x <= y && x <= z ? x : (y <= z ? y : z);

    return dimensions
    .map(x => ({ a: (x.x * x.y), b: (x.y * x.z), c: (x.x * x.z) }))
    .map(x => 2 * x.a + 2* x.b + 2 * x.c + smallest(x.a, x.b, x.c))
    .reduce((pv, cv) => pv + cv, 0).toString()
    
  }

  solve2(input: string): string {
    const twoSmallest = (x: number, y: number, z: number) => x >= y && x >= z ? [y, z] : (y >= z && y >= x ? [x, z] : [x, y]);
    
    const dimensions = this.getDimensions(input);

    return dimensions.map(x => {
      const ts = twoSmallest(x.x, x.y, x.z);
      return x.x * x.y * x.z + ts[0] * 2 + ts[1] * 2;
    }).reduce((pv, cv) => pv + cv, 0).toString();
  }

  getDimensions(input: string): { x: number; y: number; z: number; }[] {
    return input.split('\n')
    .map(line => line.trim().split('x'))
    .map(arr => ({ 
      x: parseInt(arr[0]), 
      y: parseInt(arr[1]),
      z: parseInt(arr[2])
    }));
  }
}