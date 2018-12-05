import { Drawer } from './drawer';
import { challenges as challenges15, inputs as inputs15 } from "./2015";
import { challenges as challenges16, inputs as inputs16 } from "./2016";
import { challenges as challenges17, inputs as inputs17 } from "./2017";
import { challenges as challenges18, inputs as inputs18 } from "./2018";
import { Challenge } from "./challenge";
import { entry } from './test';

const drawer = new Drawer();


entry();
//challenges();

function challenges() {
  const map15 = mapChallangesToInput(challenges15, inputs15);
  const map16 = mapChallangesToInput(challenges16, inputs16);
  const map17 = mapChallangesToInput(challenges17, inputs17);
  const map18 = mapChallangesToInput(challenges18, inputs18);
  drawYear('2015', map15);
  drawYear('2016', map16);
  drawYear('2017', map17);
  drawYear('2018', map18);

  drawer.writeLine('=');
}

function mapChallangesToInput(challenges: Challenge[], inputs: string[]): [Challenge, string][] {
  const result: [Challenge, string][] = [];
  
  for(const challenge of challenges) {
    if(inputs[challenge.day]) {
      result.push([challenge, inputs[challenge.day]]);
    }
  }

  return result;
}

function solveAndLog(map: [Challenge, string][]) {
  const sorted = map.sort((a, b) => a[0].day - b[0].day);

  for(const challenge of sorted) {

    const result1 = challenge[0].solve(challenge[1]).trim();
    const result2 = challenge[0].solve2(challenge[1]).trim();

    drawer.writeDayResults(challenge[0].day, result1, result2);

    if(!(sorted.indexOf(challenge) === sorted.length - 1)) {
      drawer.writeLine('-');
    }

  }
}

function drawYear(year: string, map: [Challenge, string][]) {
  if(map.length > 0) {
    drawer.writeLine('=');
    drawer.writeYearRow(year);
    drawer.writeLine('-');
    solveAndLog(map);
  }
}

