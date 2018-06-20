import * as React from 'react';
import { Line, TextNode } from '../objects/TextNodes';

export type Props = {
  line?: Line
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
    const spans: Array<JSX.Element| '\u00a0' | null> = [];
    const { line } = this.props;

    if (line) {
      line.forEach((textNode, key) => {
          spans.push(this.buildTextNode(textNode, key));
      });
    }

    return (
      <div>
        { spans }
      </div>
    );
  }
}
