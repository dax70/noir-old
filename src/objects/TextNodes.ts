
type Kind = 'word' | 'symbol' | 'space';

type TextNode  = {
  index: number
  length: number
  kind: Kind
  value: string
}

class TextParser {
  parse () {
    //
  }
}

export {
  TextNode,
  Kind,
  TextParser
}
