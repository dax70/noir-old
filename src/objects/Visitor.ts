import { TextNode } from './TextNodes';

type TextNodeHandler<T> = {
  visitWord(word: TextNode): T
  visitSpace(space: TextNode): T
  visitSymbol(symbol: TextNode): T
}

class Visitor {

  visit(textNode: TextNode) {
    switch (textNode.kind) {
      case 'word':
        break;
      case 'space':
        break;
      case 'symbol':
        break;
    }
  }
}

export {
  Visitor,
  TextNodeHandler
}
