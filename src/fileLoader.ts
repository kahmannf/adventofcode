import { existsSync, readFileSync } from "fs";


export function fileLoader(year: number, day: number, test: boolean = false) {
  const path = `./src/${year}/inputs/input${day}${ test ? '_test': '' }.txt`;

  if(existsSync(path)) {
    return readFileSync(path).toString('utf8');
  } else {
    return undefined;
  }

}