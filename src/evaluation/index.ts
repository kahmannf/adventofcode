import { Drawer } from './../drawer';
import { Leaderboard } from "./leaderboard";
import { LinqObject, fromObject, Grouping, Linq } from '../Linq';
import { User } from './user';
import { orderByDesc, groupBy, selectMany, selectWithIndex, select, join, thenBy, thenByDesc, orderBy } from '../Linq/operators';

const leaderBoard: Leaderboard = require('../../src/evaluation/scores.json');

const members = fromObject<User>(leaderBoard.members, 'values');

const localPlacements = members.pipe(
  groupBy(x => x.local_score),
  orderByDesc(x => x.key),
  selectWithIndex((x, i) => ({ local_placement: i + 1, grouping: x })),
  selectMany(x => Linq(x.grouping.values).pipe(select(p => ({ local_placement: x.local_placement, user: p }))))
);

const placements = members
  .pipe(
    groupBy(x => x.stars),
    orderByDesc(x => x.key),
    selectWithIndex((x, i) => ({ rw_placement: i + 1, grouping: x })),
    selectMany(x => Linq(x.grouping.values).pipe(select(p => ({ rw_placement: x.rw_placement, user: p })))),
    join(localPlacements, x => x.user.id, x => x.user.id, (o, i) => ({ user: o.user, rw_placement: o.rw_placement, local_placement: i.local_placement })),
    orderBy(x => x.rw_placement),
    thenBy(x => x.local_placement)
  );


const drawer: Drawer = new Drawer(10, 13, 30, 10, 6, 6);

drawer.writeLine('=');
const spalten = ['Platz (RW)', 'Platz (Score)', 'Name', 'Id', 'Sterne', 'Punkte'];

drawer.writeRow(...spalten.map(x => ({ entry: x, pad: <'left'>'left' })));

drawer.writeLine('-')


for (const p of placements) {
  let entries: { entry: string, pad?: 'left' | 'right' }[] = [
    { entry: p.rw_placement.toString(), pad: "left" },
    { entry: p.local_placement.toString(), pad: "left" },
    { entry: p.user.name || '<anonymous>' },
    { entry: p.user.id, pad: 'left' },
    { entry: p.user.stars.toString(), pad: "left" },
    { entry: p.user.local_score.toString(), pad: "left" },
  ]

  drawer.writeRow(...entries);
}

drawer.writeLine('=');


