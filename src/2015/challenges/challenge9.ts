import { Challenge } from './../../challenge';
export class Challenge9 implements Challenge {
  day: number = 9;  
  
  solve(input: string): string {

    const map = new LocationMap();

    for(const line of input.split('\n')) {
      map.add(line.trim());
    }

    return map.getShortestRoute().toString();
  }
  solve2(input: string): string {
    return "";
  }


  
}

class LocationMap {
  private locationMaps : { [key in string]: { [destination in string]: number }} = {};

  add(s: string) {
    const splitted = s.split(' ');

    this.addDistance(splitted[0].trim(), splitted[2].trim(), parseInt(splitted[4]));

  }

  private addDistance(from: string, to: string, distance: number) {
    if(!this.locationMaps[from]) {
      this.locationMaps[from] = {};
    }

    if(!this.locationMaps[to]) {
      this.locationMaps[to] = {};
    }

    this.locationMaps[from][to] = distance;
    this.locationMaps[to][from] = distance;
  }

  getShortestRoute(): number {

    

    
    return 0;
  }
}
