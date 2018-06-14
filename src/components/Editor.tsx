import * as React from 'react';
import { List } from '../lib';
import { TextNode } from '../objects/TextNodes';

export type Props = {
  line?: List<TextNode>
};

export class Editor extends React.Component<Props, {}> {

  buildTextNode(textNode: TextNode, key: number) {
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
    const { line } = this.props;

    if (line) {
      // manual iterator due to Typescript downlevel
      const iterator = line[Symbol.iterator]();
      let result = iterator.next();

      while (!result.done) {
        if (result && result.value) {
          const textNode = result.value;
          spans.push(this.buildTextNode(textNode, key));
        }

        result = iterator.next();
        key ++;
      }
    }

    return (
      <div>
        { spans }
      </div>
    );
  }
}
