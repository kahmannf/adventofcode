import { Challenge } from "../../challenge";

export class Challenge8 implements Challenge {

  day: number = 8;  
  
  solve(input: string): string {

    let code = 0;
    let memory = 0;

    for(let line of input.split('\n')) {
      line = line.trim();
      code += line.length;
      memory += this.calculateCodeMemoryCharacters(line);
    }

    return (code - memory).toString();
  }

  solve2(input: string): string {

    let raw = 0;
    let encoded = 0;

    for(let line of input.split('\n')) {
      line = line.trim();
      raw += line.length;
      encoded += this.getEncodedLength(line);
    }

    return (encoded - raw).toString();
  
  }

  calculateCodeMemoryCharacters(s: string): number {
     return s
     .replace(/(\\\\)/g, 'X')
     .replace(/(\\")/g, 'X')
     .replace(/(\\x[\da-f]{2})/g, 'X')
     .replace(/(")/g, '').length;
  }

  getEncodedLength(s: string): number {
    return s
    .replace(/(^"|"$)/g, 'XXX')
    .replace(/(\\")/g, 'XXXX')
    .replace(/(\\)/g, 'XX').length;
  }
}