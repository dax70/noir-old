import * as React from 'react';
import { LinkedList, List } from '../lib';
import { TextNode } from '../objects/TextNodes';

const line: List<TextNode> = new LinkedList<TextNode>();
line.add({
  index: 0,
  kind: 'word',
  length: 5,
  value: 'Hello'
});
line.add({
  index: 6,
  kind: 'space',
  length: 1,
  value: ''
});
line.add({
  index: 6,
  kind: 'word',
  length: 1,
  value: 'World'
});

export type Props = {
  //
};

export class Editor extends React.Component<Props, {}> {

  buildChild(textNode: TextNode, key: number) {
    switch (textNode.kind) {
      case 'word':
        return (<span key={key}>{textNode.value}</span>);
      case 'space':
        return ('\u00a0')
    }

    return null;
  }

  render() {
    const spans = [];
    let key = 1;
    const iterator = line[Symbol.iterator]();
    let result = iterator.next();
    while (!result.done) {
      if (result && result.value) {
        const textNode = result.value;
        spans.push(this.buildChild(textNode, key));
      }

      result = iterator.next();
      key ++;
    }

    return (
      <div>
        { spans }
      </div>
    );
  }
}
