import { Challenge } from './../../challenge';
import { Linq, fromObject } from '../../Linq';
import { select, where, aggregate, selectMany, firstOrUndefined, distinct, orderBy, concat, first } from '../../Linq/operators';
import { createVerify } from 'crypto';
import { Drawer } from '../../drawer';

export class Challenge7 implements Challenge {
  day = 7;
  test = false;
  solve(input: string): string {
    try {

      const map = this.getMap(input);

      let allSteps = Object.keys(map);
      const original = { ...map };

      let result = ''

      let lastStep = '';

      while (true) {

        allSteps = Object.keys(map);
        if (!allSteps || !allSteps.length) {
          break;
        }

        const possibleNext = this.getPossibleNext(allSteps, map);


        lastStep = '';

        for (const pn of possibleNext) {
          const req = map[pn];

          if (req.every(x => result.indexOf(x) !== -1)) {
            lastStep = pn;
            break;
          }
        }
        if (lastStep.length !== 1) {
          throw new Error('Invalid next step-length: ' + lastStep.length);
        }

        result += lastStep;

        for (const requirements of allSteps.map(x => map[x])) {
          const index = requirements.indexOf(lastStep);
          if (index !== -1) {
            requirements.splice(index, 1);
          }
        }

        delete map[lastStep];
      }

      for (const key in original) {

        const keyIndex = result.indexOf(key);

        if (keyIndex === -1) {
          console.log('missing: ' + key);
        } else {

          for (const req in original[key]) {
            if (result.indexOf(req) > keyIndex) {
              console.log(req + ' needs to be completed before ' + key);
            }
          }

        }

      }

      return result;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }




  solve2(input: string): string {

    const drawer = new Drawer(10, 10, 10, 10);

    // drawer.writeLine('-')
    // drawer.writeRow(...['Second', 'Worker 1', 'Worker 2', 'Done'].map(x => ({ entry: x })));
    // let counter = -2;
    let counter = -1;

    try {
      const map: { [key in string]: Requirement } = fromObject<{ key: string; value: string[] }>(this.getMap(input), 'key-value-pairs').pipe(
        select(x => ({
          key: x.key,
          req: {
            seconds: x.key.charCodeAt(0) - 64 + (this.test ? 0 : 60),
            steps: x.value
          }
        })),
        aggregate((pv, cv) => { pv[cv.key] = cv.req; return pv }, {} as { [key in string]: Requirement })
      );

      let workers: string[] = this.test ? ['', ''] : ['', '', '', '', ''];

      let result = '';

      let allSteps = Object.keys(map);
      const original = {...map};

      while (allSteps.length > 0) {
        ++counter;
        // drawer.writeRow(
        //   { entry: (++counter).toString() },
        //   { entry: workers[0] || '.' },
        //   { entry: workers[1] || '.' },
        //   { entry: result }
        // )

        for (const [i, worker] of workers.entries()) {
          if (worker && --map[worker].seconds === 0) {
            //console.log('completing worker: ' + worker);
            result += worker;

            // remove step from all requirement 
            for (const requirements of allSteps.map(x => map[x])) {
              if (requirements && requirements.steps) {
                const index = requirements.steps.indexOf(worker);
                if (index !== -1) {
                  requirements.steps.splice(index, 1);
                }
              }
            }

            delete map[worker];

            allSteps = Object.keys(map);
            workers[i] = '';
          }
        }

        while (workers.some(x => x === '')) {

          const next = Linq(allSteps.filter(x => !workers.some(y => y === x)).map(xAll => ({ step: xAll, req: map[xAll] }))
            .filter(xAll => { return xAll.req.steps.length === 0 })
            .map(xNext => xNext.step)).pipe
            (
            distinct(),
            orderBy(x => x),
            firstOrUndefined()
            );
          if (next) {
            //console.log('assigning ' + next + ' to ' + workers.indexOf(''));
            workers[workers.indexOf('')] = next;
          } else {
            break;
          }
        }
      }

      for (const key in original) {

        const keyIndex = result.indexOf(key);

        if (keyIndex === -1) {
          console.log('missing: ' + key);
        } else {

          const steps = original[key] ? original[key].steps : [];
          for (const req in steps) {
            if (result.indexOf(req) > keyIndex) {
              console.log(req + ' needs to be completed before ' + key);
            }
          }

        }

      }

      return counter.toString();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getPossibleNext(allSteps: string[], map: { [key in string]: string[] }): Iterable<string> {
    return Linq(allSteps.map(xAll => ({ step: xAll, req: map[xAll] }))
      .filter(xAll => { return xAll.req.length === 0 })
      .map(xNext => xNext.step)).pipe
      (
      distinct(),
      orderBy(x => x)
      );
  }

  getMap(input: string) {
    const steps = Linq(input.split('\n')).pipe(
      select(line => {
        const split = line.trim().split(' ');
        return {
          step: split[7],
          required: split[1]
        }
      })
    );

    const map: { [key in string]: string[] } = {};

    for (const step of steps) {
      if (!map[step.step]) {
        map[step.step] = [step.required]
      } else {
        map[step.step].push(step.required);
      }
    }

    const allRequirements = [...fromObject<string[]>(map, 'values').pipe(selectMany(x => x || []), distinct())];

    for (const requirement of allRequirements) {
      if (!map[requirement]) {
        map[requirement] = [];
      }
    }

    return map;
  }
}

class Requirement {
  seconds: number;
  steps: string[];
}


