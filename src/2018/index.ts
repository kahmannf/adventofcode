import { Challenge24 } from './challenges/challenge24';
import { Challenge23 } from './challenges/challenge23';
import { Challenge22 } from './challenges/challenge22';
import { Challenge21 } from './challenges/challenge21';
import { Challenge20 } from './challenges/challenge20';
import { Challenge19 } from './challenges/challenge19';
import { Challenge18 } from './challenges/challenge18';
import { Challenge17 } from './challenges/challenge17';
import { Challenge16 } from './challenges/challenge16';
import { Challenge15 } from './challenges/challenge15';
import { Challenge14 } from './challenges/challenge14';
import { Challenge13 } from './challenges/challenge13';
import { Challenge12 } from './challenges/challenge12';
import { Challenge11 } from './challenges/challenge11';
import { Challenge10 } from './challenges/challenge10';
import { Challenge9 } from './challenges/challenge9';
import { Challenge8 } from './challenges/challenge8';
import { Challenge7 } from './challenges/challenge7';
import { Challenge6 } from './challenges/challenge6';
import { Challenge5 } from './challenges/challenge5';
import { Challenge4 } from './challenges/challenge4';
import { Challenge3 } from './challenges/challenge3';
import { Challenge1 } from './challenges/challenge1';
import { Challenge } from "../challenge";
import { Challenge2 } from './challenges/challenge2';
import { Challenge25 } from './challenges/challenge25';
import { fileLoader } from '../fileLoader';

export const challenges: Challenge[] = [
  new Challenge1(),
  new Challenge2(),
  new Challenge3(),
  new Challenge4(),
  new Challenge5(),
  new Challenge6(),
  new Challenge7(),
  new Challenge8(),
  new Challenge9(),
  new Challenge10(),
  new Challenge11(),
  new Challenge12(),
  new Challenge13(),
  new Challenge14(),
  new Challenge15(),
  new Challenge16(),
  new Challenge17(),
  new Challenge18(),
  new Challenge19(),
  new Challenge20(),
  new Challenge21(),
  new Challenge22(),
  new Challenge23(),
  new Challenge24(),
  new Challenge25()
];

const year = 2018;

export const inputs: string[] = [
  undefined,
  fileLoader(year, 1),
  fileLoader(year, 2),
  fileLoader(year, 3),
  fileLoader(year, 4),
  fileLoader(year, 5),
  fileLoader(year, 6),
  fileLoader(year, 7),
  fileLoader(year, 8),
  fileLoader(year, 9),
  fileLoader(year, 10),
  fileLoader(year, 11),
  fileLoader(year, 12),
  fileLoader(year, 13),
  fileLoader(year, 14),
  fileLoader(year, 15),
  fileLoader(year, 16),
  fileLoader(year, 17),
  fileLoader(year, 18),
  fileLoader(year, 19),
  fileLoader(year, 20),
  fileLoader(year, 21),
  fileLoader(year, 22),
  fileLoader(year, 23),
  fileLoader(year, 24),
  fileLoader(year, 25)
];

