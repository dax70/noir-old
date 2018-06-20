import { LinkedList } from "../lib";
import { LinkedNode } from "../lib/LinkedList";

type Kind = 'word' | 'symbol' | 'space';

type TextNode  = {
  index: number
  length: number
  kind: Kind
  value: string,
  link?: LinkedNode<TextNode>
}

class TextParser {
  parse () {
    //
  }
}

class Line {
  private line: LinkedList<TextNode>;

  constructor() {
    this.line = new LinkedList<TextNode>();
  }

  addWord(word: string) {
    const node: TextNode = {
      index: this.line.length -1,
      kind: 'word',
      length: word.length,
      value: word
    };
    // bind link to node
    node.link = this.line.add(node);
  }

  addSpace() {
    // TODO: consider taking a number of spaces
    const node: TextNode = {
      index: this.line.length -1,
      kind: 'space',
      length: 1,
      value: ' '
    };
    this.line.add(node);
  }

  get current() {
    const { line } = this;
    // TODO: currently always return last
    // return line.get(line.length -1);
    return line.last();
  }

  forEach(func: (textNode: TextNode, index: number) => void) {
      // manual iterator due to Typescript downlevel
      const { line } = this;
      const iterator = line[Symbol.iterator]();
      let result = iterator.next();
      let index = 0;

      while (!result.done) {
        if (result && result.value) {
          const textNode = result.value;
          func(textNode, index);
        }

        result = iterator.next();
        index ++;
      }
  }

  remove(node: TextNode) {
    const { line } = this;
    const { link } = node;

    if(!link) { throw new Error('Can not remove non-existant node!')}

    line.remove(link);
  }
}

export {
  TextNode,
  Kind,
  TextParser,
  Line
}
