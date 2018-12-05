export class Drawer {


  constructor(
    private headerColumnWidth = 20,
    private resultColumnWidth = 30
  ) {

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
    // 10 => 4 pipe symbols total plus 2 withespaces  per column
    this.print(char.repeat(this.headerColumnWidth + this.resultColumnWidth + this.resultColumnWidth + 10));
  }

  writeRow(header: string, result1: string, result2: string) {
    this.print(
      '|' + this.getWidth(header, this.headerColumnWidth, 'right') + 
      '|' + this.getWidth(result1, this.resultColumnWidth, 'left') +
      '|' + this.getWidth(result2, this.resultColumnWidth, 'left') +
      '|');
  }

  writeYearRow(year: string) {
    this.writeRow(year + ':', 'Part 1', 'Part 2');
  }

  writeDayResults(day: number, result1: string, result2: string) {
    this.writeRow('Day ' + day, result1, result2);
  }
}
