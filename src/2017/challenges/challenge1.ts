import { Challenge } from "../../challenge";

export class Challenge1 implements Challenge {
  day = 1;
  
  solve(input: string) {
    let result = 0;
    let next = "";

    for(let i = 0; i < input.length; i++) {
      
      
      if(i === input.length - 1) {
        next = input[0];
      }  else {
        next = input[i + 1];
      }

      if(next === input[i]) {
        result += parseInt(next);
      }
    }

    return result.toString();

  }

  solve2(input: string) {
    let result = 0;
    let next = "";

    const half = input.length / 2;

    for(let i = 0; i < input.length; i++) {
      
      
      if(i >= half) {
        next = input[i - half];
      }  else {
        next = input[i + half];
      }

      if(next === input[i]) {
        result += parseInt(next);
      }
    }

    return result.toString();
  }
}