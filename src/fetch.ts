import { Leaderboard } from './evaluation/leaderboard';
import { get, RequestOptions } from 'https';
import { writeFileSync, readFileSync } from 'fs';


const sessionCookie = readFileSync('./src/session-cookie.txt');

export function getOneInput(day: number, year: number|string) {

  const options: RequestOptions = {
    host: 'adventofcode.com',
    path: `/${year}/day/${day}/input`,
    headers: {
      'Cookie': `session=${sessionCookie}`
    }
  };

  return new Promise((resolve, reject) => get(options, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {

      if (data[data.length - 1] === '\n') {
        data = data.substring(0, data.length - 1);
      }

      if (!data.startsWith('Please')) {
        writeFileSync(`./src/${year}/inputs/input${day}.txt`, data);
      }

      resolve(data);
    });

  }).on('error', (err) => {
    reject(err.message);
  }));
}

export function getLeaderboard(year: number|string, id: string|number) {
  const options: RequestOptions = {
    host: 'adventofcode.com',
    path: `/${year}/leaderboard/private/view/${id}.json`,
    headers: {
      'Cookie': `session=${sessionCookie}`
    }
  };

  return new Promise((resolve, reject) => get(options, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {

      if (data[data.length - 1] === '\n') {
        data = data.substring(0, data.length - 1);
      }

      resolve(JSON.parse(data));
    });

  }).on('error', (err) => {
    reject(err.message);
  }));
}

export function getInputs(dates: { year: number, day: number }[]): Promise<{}> {

  let completed = 0;

  return new Promise((resolve, reject) => {
    for (const date of dates) {
      getOneInput(date.day, date.year)
        .then(data => {

          writeFileSync(`./src/${date.year}/inputs/input${date.day}.txt`, data);

          if (++completed === dates.length) {
            resolve();
          }
        }).catch(err => {
          if (++completed === dates.length) {
            resolve();
          }
        });
    }
  });
}


