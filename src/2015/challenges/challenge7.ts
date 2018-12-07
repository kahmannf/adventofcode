import { Challenge } from './../../challenge';
export class Challenge7 implements Challenge {
  day = 7;
  test = false;

  solve(input: string): string {
    try {
      const outputs: Lookup = {}; 

      for(const line of input.split('\n')) {
        const o: Operation = new Operation(line);
        outputs[o.Output] = o;
      }

      const last = outputs['a'];
      // x: 123     -> 001111011
      // y: 456     -> 111001000
      // d: x & y   -> 001001000 -> 72
      // e: x | y   -> 111111011 -> 507
      // f: x << 2  -> 111101100 -> 492
      // g: y >> 2  -> 001110010 -> 114

      

      return last.computeOutput(outputs).toString();

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  solve2(input: string): string {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      //console.log(error);
      throw error;
    }
  }

}

type Lookup = { [key in string]: Operation }

type Operations =
  | 'Constant'
  | 'And'
  | 'Or'
  | 'LShift'
  | 'RShift'
  | 'Not'
  | 'LazyConst'

class Operation {
  private _original: string;
  private _leftInput: string;
  private _rightInput: string;
  private output: string;
  private outputValue: number;
  private operation: Operations;

  private getLeftInputValue(operationsByOutput: Lookup): number {
    const temp = parseInt(this._leftInput, 10);
    if (!isNaN(temp)) {
      return temp;
    }
    else {
      if(!operationsByOutput[this._leftInput])
        console.log('hey2' + this._leftInput);
      return operationsByOutput[this._leftInput].computeOutput(operationsByOutput);
    }
  }

  private getRightInputValue(operationsByOutput: Lookup): number {
    const temp = parseInt(this._rightInput, 10);
    if (!isNaN(temp)) {
      return temp;
    }
    else {
      if(!operationsByOutput[this._rightInput])
        console.log('hey1' + this._rightInput);
      return operationsByOutput[this._rightInput].computeOutput(operationsByOutput);
    }
  }

  get Output(): string {
    return this.output
  }

  constructor(operation: string) {
    this._original = operation;
    this.parseOperation();
  }

  private parseOperation(): void {
    const sides = this._original.split('>');
    sides[0] = sides[0].substring(0, sides[0].length - 1);

    this.output = sides[1].trim();

    const temp = parseInt(sides[0]);

    if (!isNaN(temp)) {
      this.outputValue = temp;
      this.operation = 'Constant';
    }
    else {
      const op: string[] = sides[0].split(' ');

      if (sides[0].indexOf("AND") !== -1 || sides[0].indexOf("OR") !== -1) {
        this._leftInput = op[0].trim();
        this._rightInput = op[2].trim();

        if (op[1] == "AND") {
          this.operation = 'And';
        }
        else {
          this.operation = 'Or';
        }
      }
      else if (sides[0].indexOf("SHIFT") !== -1) {
        this._leftInput = op[0].trim();
        this._rightInput = op[2].trim();

        if (op[1].startsWith("L")) {
          this.operation = 'LShift';
        }
        else {
          this.operation = 'RShift';
        }
      }
      else if (sides[0].indexOf("NOT") !== -1) {
        this.operation = 'Not';
        this._leftInput = op[1].trim();
      }
      else // lazy const
      {
        this.operation = 'LazyConst';
        this._leftInput = op[0].trim();
      }
    }
  }

  computeOutput(operationsByOutput: Lookup): number {
    if (this.outputValue !== undefined) {
      return this.outputValue;
    }
    else {
      switch (this.operation) {
        // sollte schon in der ersten if-Bedingung rausgefiltert sein
        //case Operations.Constant:
        //    return outputValue.Value;
        case 'And':
          this.outputValue = (this.getLeftInputValue(operationsByOutput) & this.getRightInputValue(operationsByOutput))  & 65535;
          break;
        case 'Or':
          this.outputValue = (this.getLeftInputValue(operationsByOutput) | this.getRightInputValue(operationsByOutput))  & 65535;
          break;
        case 'LShift':
          this.outputValue = (this.getLeftInputValue(operationsByOutput) << this.getRightInputValue(operationsByOutput)) & 65535;
          break;
        case 'RShift':
          this.outputValue = (this.getLeftInputValue(operationsByOutput) >> this.getRightInputValue(operationsByOutput))  & 65535;
          break;
        case 'Not':
          this.outputValue = ~this.getLeftInputValue(operationsByOutput) & 65535;
          break;
        case 'LazyConst':
          this.outputValue = this.getLeftInputValue(operationsByOutput) & 65535;
          break;
        default:
          throw new Error('invalid operation: ' + this.operation);
      }
      return this.outputValue;
    }
  }

  reset(): void {
    if (this.operation != 'Constant') {
      this.outputValue = undefined;
    }
  }

  overrite(masterValue: number): void {
    this.operation = 'Constant';
    this.outputValue = masterValue;
  }
}
