import * as React from 'react';
import { Container, Doc, Format, TextSpan } from '../objects';

export type Props = {
  data: Doc
}

function buildText(textSpan: TextSpan, format: Format) {
  // TODO: construct HTML
  // tslint:disable-next-line:curly
  if(format.kind !== 'text') return null;

  let { markers } = format;

  if (!Array.isArray(markers)) {
    markers = [markers];
  }

  const { content } = textSpan;

  let currentIndex = 0;

  const comps: JSX.Element[] = [];

  markers.forEach((marker, i) => {
    const { location } = marker;
    const { start, length } = location;

    // create a non styled node
    if(currentIndex < start) {
      const prev = content.substring(currentIndex, start);
      comps.push(
        <span>
          { prev }
        </span>
      );
    }

    // const mstyle = marker.style;
    // if (!typeof mstyle === 'number' && ) {
    // }
    const style = {} ;


    // styled node
    const text = content.substring(start, start + length);
    comps.push(
      <span key={i} style={style}>
        {text}
      </span>
    );

    currentIndex = start + length;
  });

  if (currentIndex < content.length) {
    const last = content.substring(currentIndex);
    comps.push(
      <span>
        {last}
      </span>
    );
  }

  return comps;
}

export class BDoc extends React.Component<Props, {}> {
  render() {
    const { data: doc } = this.props;

    const { root, format } = doc;

    let comp = null;
    // Warning: refactor - hardcoded to bootstrap.
    const container: Container = root[0];
    if (container.kind === 'container') {
      const textFormat = format[0];
      comp = container.children.map((inter, i) => {
        if (inter.kind === 'text') {
          return buildText(inter, textFormat);
        }
        return null;
      });
    }

    return (
      <div>
        {comp}
      </div>
    );
  }
}
