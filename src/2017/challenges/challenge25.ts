import { Challenge } from "../../challenge";

export class Challenge25 implements Challenge {
  day = 25;

  solve(input: string): string {
    return "not executed";

    const machine = buildTuringMachine(input.split('\n'));

    return machine.generateChecksum().toString();
  }

  solve2(input: string): string {
    return "";
  }


}

function buildTuringMachine(lines: string[]): TuringMachine {

  const initialState = lines[0].trim().split(' ')[3].substring(0, 1);
  const steps = parseInt(lines[1].trim().split(' ')[5]);

  const machine = new TuringMachine(initialState, steps);

  let lineIndex = 3;

  let currentState: StateBlueprint = {}

  while (lineIndex < lines.length) {
    switch ((lineIndex - 2) % 10) {
      case 0:
        machine.addState(currentState);
        currentState = {};
        break;
      case 1:
        currentState.name = lines[lineIndex].trim().split(' ')[2].substring(0, 1);
        break;
      case 2:
        currentState.on0 = {};
        break;
      case 3:
        currentState.on0.writeValue = lines[lineIndex].trim().endsWith('1.') ? 1 : 0;
        break;
      case 4:
        currentState.on0.moveDirection = lines[lineIndex].trim().endsWith('left.') ? 'left' : 'right';
        break;
      case 5:
        currentState.on0.nextState = lines[lineIndex].trim().split(' ')[4].substring(0, 1);
        break;
      case 6:
        currentState.on1 = {};
        break;
      case 7:
        currentState.on1.writeValue = lines[lineIndex].trim().endsWith('1.') ? 1 : 0;
        break;
      case 8:
        currentState.on1.moveDirection = lines[lineIndex].trim().endsWith('left.') ? 'left' : 'right';
        break;
      case 9:
        currentState.on1.nextState = lines[lineIndex].trim().split(' ')[4].substring(0, 1);
        break;
    }

    lineIndex++;
  }

  machine.addState(currentState);

  return machine;
}

interface Operation {
  writeValue?: 0 | 1;
  moveDirection?: 'left' | 'right';
  nextState?: string;
}

interface StateBlueprint {
  name?: string;
  on0?: Operation;
  on1?: Operation;
}



class TuringMachine {
  private states: { [key in string]: StateBlueprint } = {};

  private currentState: string;

  private highPositions: number[] = [];

  private currentPosition: number = 0;

  constructor(initialState: string, private steps: number) {
    this.currentState = initialState;
  }

  addState(state: StateBlueprint) {
    this.states[state.name] = state;
  }

  generateChecksum(): number {
    for(let i = 0; i < this.steps; i++) {
      this.moveStep();
    }

    return this.highPositions.length;
  }

  private moveStep() {
    const blueprint = this.states[this.currentState];

    let operation: Operation;

    const indexOfPosition = this.highPositions.indexOf(this.currentPosition);

    const isZero: boolean = indexOfPosition === -1;

    if(isZero) {
      operation = blueprint.on0;
      if(operation.writeValue === 1) {
        this.highPositions.push(this.currentPosition);
      }
    } else {
      operation = blueprint.on1;
      if(operation.writeValue === 0) {
        this.highPositions.splice(indexOfPosition, 1);
      }
    }

    if(operation.moveDirection === 'right') {
      this.currentPosition++;
    } else {
      this.currentPosition--;
    }

    this.currentState = operation.nextState;
    
  }
}



