import { Challenge } from './../../challenge';
export class Challenge8 implements Challenge {
  day = 8;
  test = false;
  solve(input: string): string {
    const numbers: number[] = input.split(' ').map(x => parseInt(x.trim(), 10));
    
    return this.getTree(numbers).sumMetaData().toString();
  }
  solve2(input: string): string {
    const numbers: number[] = input.split(' ').map(x => parseInt(x.trim(), 10));
    
    return this.getTree(numbers).getValue().toString();
  }

  getTree(input: number[]): TreeNode {
    const { node } = this.getNextNode(input, 0);
    return node;
  }

  getNextNode(numbers: number[], index: number): { node: TreeNode; index: number } {
    const node = new TreeNode();

    node.header.childCount = numbers[index];
    node.header.metaDataCount = numbers[++index];

    index++;

    while(node.header.childCount > node.children.length) {
      const result = this.getNextNode(numbers, index);
      index = result.index;
      node.children.push(result.node);
    }

    while(node.header.metaDataCount > node.metaData.length) {
      // console.log(node.metaData.length + '/' + node.header.metaDataCount);
      // console.log(numbers[index]);
      node.metaData.push(numbers[index++]);
    }

    return { node, index };
  }
}

class TreeNode {
  header: {
    childCount: number;
    metaDataCount: number;
  } = {
    childCount: 0,
    metaDataCount: 0
  };
  children: TreeNode[] = [];
  metaData: number[] = [];


  sumMetaData(): number {
    return this.metaData.reduce((pv, cv) => pv + cv, this.children.reduce((pv, cv) => pv + cv.sumMetaData(), 0));
  }
  
  getValue(): number {
    if(this.header.childCount > 0) {
      const ch = this.children
      return this.metaData.reduce((total, current) => {
        if(current > 0 && ch[current - 1]) {
          return total + ch[current - 1].getValue();
        } else {
          return total;
        }
      }, 0)
    } else {
      return this.sumMetaData();
    }
  }
}
