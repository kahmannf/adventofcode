import { Challenge } from './../../challenge';
export class Challenge4 implements Challenge {
  day = 4;

  solve(input: string): string {

    const lines = input.split('\n');

    const lineTimes: LineTime[] = [];

    for (const line of lines) {
      lineTimes.push(this.parseTime(line));
    }

    lineTimes.sort(arrayLineTimesSort);

    const minutesByGuards: { [x in number]: number } = {};
    let guardMax = 0;
    let guardMaxId = -1;

    const sleepingTimes = this.parseActions(lineTimes);

    for (const sleep of sleepingTimes) {
      if (!minutesByGuards[sleep.guard]) {
        minutesByGuards[sleep.guard] = sleep.length;
      } else {
        minutesByGuards[sleep.guard] += sleep.length;
      }

      if (guardMax < minutesByGuards[sleep.guard]) {
        guardMax = minutesByGuards[sleep.guard];
        guardMaxId = sleep.guard;
      }
    }

    const guardMaxSleepingTimes = sleepingTimes.filter(x => x.guard === guardMaxId);

    const maxMinute = this.getMaximumMinute(guardMaxSleepingTimes);

    return (maxMinute * guardMaxId).toString();
  }
  solve2(input: string): string {

    const lines = input.split('\n');

    const lineTimes: LineTime[] = [];

    for (const line of lines) {
      lineTimes.push(this.parseTime(line));
    }

    lineTimes.sort(arrayLineTimesSort);

    const sleepingTimes = this.parseActions(lineTimes);

    const guardIds: number[] = sleepingTimes.map(x => x.guard).filter((value, index, self) => self.indexOf(value) === index);

    const guardsMaxMinutes: { guard: number, minute: number, times: number } = { guard: -1, minute: -1, times: 0 };

    for (const guardId of guardIds) {

      const minuteTimes = this.getMaximumMinuteTimes(sleepingTimes.filter(x => x.guard === guardId));

      if (minuteTimes[1] > guardsMaxMinutes.times) {
        guardsMaxMinutes.guard = guardId;
        guardsMaxMinutes.minute = minuteTimes[0];
        guardsMaxMinutes.times = minuteTimes[1];
      }
    }

    return (guardsMaxMinutes.guard * guardsMaxMinutes.minute).toString();
  }


  parseTime(line: string): LineTime {

    const timeString = line.substring(1, 17);
    const action = line.substring(19);

    const yearString = timeString.substring(0, 4);
    const monthString = timeString.substring(5, 7);
    const dayString = timeString.substring(8, 10);
    const hourString = timeString.substring(11, 13);
    const minuteString = timeString.substring(14, 16);

    return {
      year: parseInt(yearString, 10),
      month: parseInt(monthString, 10),
      day: parseInt(dayString, 10),
      hour: parseInt(hourString, 10),
      minute: parseInt(minuteString, 10),
      action
    };

  }

  parseActions(orderedLineTimes: LineTime[]): SleepingTime[] {

    let guard: number;
    let startTime: LineTime;

    const result: SleepingTime[] = [];

    for (let i = 0; i < orderedLineTimes.length; i++) {
      const action = orderedLineTimes[i].action;
    }

    for (let i = 0; i < orderedLineTimes.length; i++) {
      const action = orderedLineTimes[i].action.trim();

      if (action.startsWith('Guard')) {
        guard = parseInt(action.split(' ')[1].substring(1), 10);
      } else if (action === 'falls asleep') {
        startTime = orderedLineTimes[i];
      } else if (action === 'wakes up') {
        result.push({
          startTime,
          guard,
          endTime: orderedLineTimes[i],
          length: this.diffInMin(startTime, orderedLineTimes[i])
        });
      }

    }

    return result;
  }

  lineTimeToDate(lt: LineTime) {
    return new Date(lt.year, lt.month, lt.day, lt.hour, lt.minute);
  }

  diffInMin(start: LineTime, end: LineTime): number {
    return (this.lineTimeToDate(end).getTime() - this.lineTimeToDate(start).getTime()) / (1000 * 60);
  }

  getMaximumMinute(sts: SleepingTime[]): number {
    const frameMap: TimeFrameMap = {};

    for (const st of sts) {
      this.markTimeFrame(st, frameMap);
    }

    return frameMap[0].indexOf(Math.max(...frameMap[0]));
  }

  getMaximumMinuteTimes(sts: SleepingTime[]): [number, number] {
    const frameMap: TimeFrameMap = {};

    for (const st of sts) {
      this.markTimeFrame(st, frameMap);
    }

    const maximum = Math.max(...frameMap[0]);

    return [frameMap[0].indexOf(maximum), maximum];
  }

  markTimeFrame(frame: SleepingTime, map: TimeFrameMap) {
    if (frame.startTime.day !== frame.endTime.day) {
      console.log('sleeping befor 00:00');
    } else {
      for (let h = frame.startTime.hour; h <= frame.endTime.hour; h++) {
        // start minut inclusive, endMinute exclusve
        const startMinute = frame.startTime.hour === h ? frame.startTime.minute : 0;
        const endMinute = frame.endTime.hour === h ? frame.endTime.minute : 60;

        if (!map[h]) {
          map[h] = [];

          for (let i = 0; i < 60; i++) {
            map[h][i] = 0;
          }
        }

        for (let m = startMinute; m < endMinute; m++) {
          map[h][m]++;
        }
      }
    }
  }

}

type TimeFrameMap = {
  [h in number]: number[];
};

interface LineTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;

  action: string;
}

interface SleepingTime {
  guard: number;
  startTime: LineTime;
  endTime: LineTime;
  length: number;
}

function arrayLineTimesSort(a: LineTime, b: LineTime): number {

  if (a.year !== b.year) {
    return a.year - b.year;
  }

  if (a.month !== b.month) {
    return a.month - b.month;
  }

  if (a.day !== b.day) {
    return a.day - b.day;
  }

  if (a.hour !== b.hour) {
    return a.hour - b.hour;
  }

  return a.minute - b.minute;

}
