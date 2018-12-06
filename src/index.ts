import { Drawer } from './drawer';
import { challenges as challenges15, inputs as inputs15 } from "./2015";
import { challenges as challenges16, inputs as inputs16 } from "./2016";
import { challenges as challenges17, inputs as inputs17 } from "./2017";
import { challenges as challenges18, inputs as inputs18 } from "./2018";
import { Challenge } from "./challenge";
import { entry } from './test';
import { fileLoader } from './fileLoader';
import { getOneInput } from './fetch';
import { Linq } from './Linq';
import { where } from './Linq/operators';

const drawer = new Drawer(20, 30, 30);

const map: { [year in number]: Challenge[] } = {
  2015: challenges15,
  2016: challenges16,
  2017: challenges17,
  2018: challenges18,
}

//entry();
//challenges();

new Promise<{ [year in number]: [Challenge, string][] }>((resolve, reject) => {
  const results: { [year in number]: [Challenge, string][] } = {};
  let current = 0;
  let all = Object.keys(map).map(x => map[x].length).reduce((pv, cv) => pv + cv, 0);
  const now = new Date(Date.now());
  const currentYear = now.getFullYear();
  const currentDate = now.getDate()
  
  for(let year in map) {
    results[year] = [];
    
    for(const challenge of map[year]) {
      const yearInt = parseInt(year); 
      if(yearInt > currentYear || (yearInt === currentYear && challenge.day > currentDate)) {
        results[year].push([challenge, undefined]);
        if(++current === all) {
          resolve(results);
        }
        continue;
      }

      let file = fileLoader(year, challenge.day, challenge.test || false);
      
      if(file) {
        results[year].push([challenge, file]);
        
        if(++current === all) {
          resolve(results);
        }
      } else {
        console.log('getting :' + year + '-' + challenge.day);
        getOneInput(challenge.day, year)
        .then(() => {
          results[year].push([challenge, fileLoader(year, challenge.day, challenge.test)]);
          
          if(++current === all) {
            resolve(results);
          }
        })
        .catch(err => {
          console.log(err);
          results[year].push([challenge, undefined]);
          if(++current === all) {
            resolve(results);
          }
        })
      }
    }
  }
}).then(map => {
  for(let year in map) {
    
    drawYear(year, map[year]);
  }
  drawer.writeLine('=');
});

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

  for(const challenge of Linq(sorted).pipe(where(x => !!x[1]))) {

    let result1 = '';
    let result2 = '';
    try {
      result1 = challenge[0].solve(challenge[1]).trim();
    } catch(error) {
      result1 = '#error';
    }

    try {

      result2 = challenge[0].solve2(challenge[1]).trim();
    } catch(error) {
      result2 = '#error';
    }

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

