import { LinqObject, repeat } from './../../../src/Linq';
import { join } from './../../../src/Linq/operators';

describe('Linq#join', () => {
  
  let sequence1: LinqObject<{ id: number; data: string; }>
  let sequence2: LinqObject<{ id: number; data: string; }>
  let sequence3: LinqObject<{ id: number; data: string; }>
  let sequence4: LinqObject<{ id: number; data: string; }>
  const keySelector: (x: { id: number; data: string; }) => number = x => x.id; 

  beforeAll(() => {
    sequence1 = repeat({ id: 1, data: 'name 1' }, 20, (pv) => ({ id: pv.id + 1, data: 'name ' + (pv.id + 1) }));
    sequence2 = repeat({ id: 1, data: 'name 1' }, 20, (pv) => ({ id: pv.id + 1, data: 'name ' + (pv.id + 1) }));
    sequence3 = repeat({ id: -7, data: 'name -7' }, 20, (pv) => ({ id: pv.id + 1, data: 'name ' + (pv.id + 1) }));
    sequence4 = repeat({ id: 7, data: 'name 7' }, 20, (pv) => ({ id: pv.id + 1, data: 'name ' + (pv.id + 1) }));
  });

  it('should join two equal sequences', () => {
    const joined = sequence1.pipe(join(sequence2, keySelector, keySelector, (a, b) => ({ id: a.id, data1: a.data, data2: b.data })));

    const joinedArray = [...joined];

    expect(joinedArray.length).toBe(20);

    for(const value of joinedArray) {
      expect(value.data2).toEqual(value.data1);
    }

  });

  it('should only return matching pairs', () => {
    
    const joined = sequence3.pipe(join(sequence4, keySelector, keySelector, (a, b) => ({ id: a.id, data1: a.data, data2: b.data })));

    const joinedArray = [...joined];

    expect(joinedArray.length).toBe(6);

    for(let i = 0; i < 6; i++) {
      expect(joinedArray[i].id).toBe(i + 7);

      expect(joinedArray[i].data2).toEqual(joinedArray[i].data1);
    }
  })

});