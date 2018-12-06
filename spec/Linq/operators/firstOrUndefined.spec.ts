import { LinqObject, repeat } from "../../../src/Linq";
import { firstOrUndefined, groupBy } from "../../../src/Linq/operators";

describe('Linq#firstOrUndefined', () => {

  let sequence1: LinqObject<{ id: number; data: string; }>;
  let sequence2: LinqObject<{ id: number; data: string; }>;

  beforeAll(() => {
    sequence1 = repeat({ id: 1, data: 'name 1' }, 20, (pv) => ({ id: pv.id + 1, data: 'name ' + (pv.id + 1) }));
    sequence2 = repeat({ id: -7, data: 'name 1' }, 20, (pv) => ({ id: pv.id + 1, data: 'name ' + (pv.id + 1) }));
  });

  it('should find the correct elements', () => {
    expect(sequence1.pipe(firstOrUndefined((x => x.id === 1))).data).toEqual('name 1');
    expect(sequence1.pipe(firstOrUndefined((x => x.id === 12))).data).toEqual('name 12');
    expect(sequence2.pipe(firstOrUndefined((x => x.id === -5))).data).toEqual('name -5');
    expect(sequence2.pipe(firstOrUndefined((x => x.id === 12))).data).toEqual('name 12');
  });

  it('should return undefined for not found items', () => {
    expect(sequence1.pipe(firstOrUndefined<{ id: number; data: string}>((x => x.id === -1)))).toBeUndefined();
    expect(sequence1.pipe(firstOrUndefined<{ id: number; data: string}>((x => x.id === 33)))).toBeUndefined();
    expect(sequence2.pipe(firstOrUndefined<{ id: number; data: string}>((x => x.id === -8)))).toBeUndefined();
    expect(sequence2.pipe(firstOrUndefined<{ id: number; data: string}>((x => x.id === 15)))).toBeUndefined();
  })

  it('should work with groupings', () => {

    const grouping = sequence1.pipe(groupBy(x => x.id));
    
    for(const value of grouping) {
      expect(value.values[0].id).toEqual(value.key);
    }
  })

})