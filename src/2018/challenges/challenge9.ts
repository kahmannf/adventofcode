import { Challenge } from './../../challenge';
export class Challenge9 implements Challenge {
  day = 9;
  test = false;
  solve(input: string): string {
    try{

    
    const split = input.split(' ');
    
    return new MarbleGameImproved(parseInt(split[0], 10), parseInt(split[6], 10)).runGame().getHighScore().toString();
    }
    catch(error) {
      console.log(error);
      throw error;
    }
  }
  solve2(input: string): string {
    try{
    const split = input.split(' ');
    
    return new MarbleGameImproved(parseInt(split[0], 10), parseInt(split[6], 10) * 100).runGame().getHighScore().toString();
    }
    catch(error) {
      console.log(error);
      throw error;
    }
  }

}

class MarbleGame {
  constructor(
    private players: number,
    private marbles: number
  ) {
    this.playerScore = new Array(players);
    this.circle = new Array(marbles);
  }

  private done: boolean;

  private playerScore: number[];
  private circle: number[];
  private length = 0;

  runGame(): void {
    if(!this.done) {
      this.circle[0] = 0;
      this.circle[1] = 1;
      let current = 1;
      this.length = 2;

      for(let i = 2; i <= this.marbles; i++) {
        if(i % 1000 === 0) {
          console.log(i + ' of ' + this.marbles);
        }

        if(i % 23 === 0) {
          current = this.getPositionClockwise(current, -7);
          const player = i % this.players;
          if(!this.playerScore[player]) {
            this.playerScore[player] = 0;
          }
          
          this.playerScore[player] += i + this.circle.splice(current, 1)[0];
          this.length--;
        } else {
          current = this.getPositionClockwise(current, 2);
          this.circle.splice(current, 0, i);
          //addOne(this.circle, i, current);
          this.length++;
        }
      }
    }
  }

  getHighScore(): number {
    if(!this.done) {
      this.runGame();
    }

    return Math.max(...this.playerScore);
  }

  getPositionClockwise(current: number, stepsClockwise: number): number {
    current += stepsClockwise;

    while(current >= this.length) {
      current -= this.length;
    }

    while(current < 0) {
      current += this.length;
    }
    
    return current;
  }
}

class MarbleGameImproved {
  constructor(
    private players: number,
    private marbles: number
  ) {
    this.currentItem = {
      previous: undefined,
      next: undefined,
      value: 0
    };

    this.startItem = this.currentItem;

    const oneItem = {
      previous: this.currentItem,
      next: this.currentItem,
      value: 1
    };

    this.currentItem.previous = oneItem;
    this.currentItem.next = oneItem;

    this.currentItem = oneItem;

    this.playerScores = new Array<number>(players);
  }

  playerScores: number[];

  currentItem: LinkedElement;
  startItem: LinkedElement;

  runGame(): MarbleGameImproved {
    for(let i = 2; i <= this.marbles; i++) {

      if(i % 23 === 0) {
        const itemToRemove = this.currentItem.previous.previous.previous.previous.previous.previous.previous;
        
        const player = i % this.players;

        if(!this.playerScores[player]) {
          this.playerScores[player] = 0;
        }
        
        this.playerScores[player] += i + itemToRemove.value;


        this.currentItem = itemToRemove.next;
        this.currentItem.previous = itemToRemove.previous;
        this.currentItem.previous.next = this.currentItem;

      } else {
        const newItem: LinkedElement = {
          value: i,
          previous: this.currentItem.next,
          next: this.currentItem.next.next
        }

        this.currentItem.next.next.previous = newItem;
        this.currentItem.next.next = newItem;
        this.currentItem = newItem;
      }

      // let item = this.startItem.next;
      
      // let row = '';

      // while(item !== this.startItem) {
      //   row += ' ' + (item === this.currentItem ? '(' + item.value + ')' : item.value);
      //   item = item.next;
      // }

      // row = (this.startItem === this.currentItem ? '(' + this.startItem.value + ')' : this.startItem.value) + row;
      // console.log(row);
    }
    return this;
  }

  getHighScore(): number {

    return Math.max(...this.playerScores);
  }
}

interface LinkedElement {
  previous: LinkedElement;
  next: LinkedElement;
  value: number;
}
