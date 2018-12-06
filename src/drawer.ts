export class Drawer {

  private columnWidths: number[];

  constructor(...coulmnWidths: number[]
  ) {
    this.columnWidths = coulmnWidths;
  }

  print(message: string) {
    console.log(message);
  }

  getWidth(content: string, width: number, pad: 'left' | 'right') {
    const remaining = width - content.length;

    if(remaining < 0) {
      return " " + content + " ";
    }
    
    if (pad === 'left') {
      return " ".repeat(remaining + 1) + content + " ";
    } else {
      return " " + content + " ".repeat(remaining + 1);
    }
  }

  writeLine(char: string) {
    // formula: total coulmn-widths (added up) + 2 whiespace per column + 1 space for pipe per coulmn + 1 space pipe after last column
    // width => columnWidths + 3 * column amount + 1 
    
    //10 => 4 pipe symbols total plus 2 withespaces  per column
    this.print(char.repeat(this.columnWidths.reduce((cv, pv) => cv + pv, 0) + 3 * this.columnWidths.length + 1));
  }

  writeRow(...entries: { entry: string; pad?: 'left' | 'right' }[]) {
    let row = '|'

    for(let i = 0; i < this.columnWidths.length; i++) {
      let { entry, pad } = entries[i] || { entry: '', pad: <'right'>'right'};

      row += this.getWidth(entry || '', this.columnWidths[i], pad || 'right') + '|';
    }
    
    this.print(row);
  }

  writeYearRow(year: string) {
    this.writeRow({ entry: year + ':' }, { entry: 'Part 1', pad: 'left' }, { entry: 'Part 2', pad: 'left' });
  }

  writeDayResults(day: number, result1: string, result2: string) {
    this.writeRow({ entry: 'Day ' + day }, { entry: result1, pad: 'left' }, { entry: result2, pad:'left' });
  }
}
