import * as React from 'react';
import './App.css';

import logo from './logo.svg';

import { BDoc, Editor } from './components'

import { LinkedList, List } from './lib';
import { Line, TextNode } from './objects/TextNodes';
import { sample } from './sample';

const doc = JSON.parse(sample);

type EditorState = {
  line: Line
}

const userEditorState: EditorState = {
  line: new Line()
};

export type Subscription = () => void;

export type EditorObserver = (editorState: EditorState) => void;

let observer: EditorObserver | null;

function emitChange() {
  if (observer) {
    observer(userEditorState);
  }
}

export function observe(o: EditorObserver): Subscription {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();

  // Subscription handle that clears observer
  return () => {
    observer = null;
  };
}

declare global {
  interface Document {
    caretPositionFromPoint(x: any, y: any): any
  }
}

function insertBreakAtPoint(e: { clientX: number; clientY: number; }) {
  let range;
  let textNode;
  let offset;

  if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(e.clientX, e.clientY);
    textNode = range.offsetNode;
    offset = range.offset;
  } else if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(e.clientX, e.clientY);
    textNode = range.startContainer;
    offset = range.startOffset;
  }

  const replacement = textNode.splitText(offset);
  const br = document.createElement('br');
  textNode.parentNode.insertBefore(br, replacement);
}

const handleInput = (charCode: number) => {
  const letter = String.fromCharCode(charCode);
  // tslint:disable-next-line:no-console
  console.log(letter);
  const line = userEditorState.line;
  if(line.current) {
    const word = line.current;
    word.value += letter;
    word.length += letter.length;
  } else {
    line.addWord(letter);
  }
}

window.onload =  ()=> {
  // subscribe to key presses
  document.onkeypress = (e: KeyboardEvent) => {

    handleInput(e.charCode);

    emitChange();
  };

  document.onkeydown = (e: KeyboardEvent) => {
    const { which } = e;

    if(which === 8) {
      // tslint:disable-next-line:no-console
      console.log('backspace');
      const line = userEditorState.line;
      if(line.current) {
        const node = line.current;
        if(node.length > 1) {
          // remove the last from value
          const { value  } = node;
          node.value = value.slice(0, -1);
          node.length--;
        }
        else {
          // remove the node itself (single)
          line.remove(node)
        }
      }

      emitChange();
    }
  }

  // subscribe to clicks
  const spans = document.getElementsByTagName("span");
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0 ; i < spans.length; i++) {
    spans[i].addEventListener("click", insertBreakAtPoint, false);
  }
};

const sampleLine: List<TextNode> = new LinkedList<TextNode>();
sampleLine.add({
  index: 0,
  kind: 'word',
  length: 5,
  value: 'Hello'
});
sampleLine.add({
  index: 6,
  kind: 'space',
  length: 1,
  value: ''
});
sampleLine.add({
  index: 6,
  kind: 'word',
  length: 1,
  value: 'World'
});

type AppProps = {
  line?: Line
}

class App extends React.Component<AppProps, AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.state = { line: props.line };
  }

  componentDidMount() {
    observe(editorState => {
      this.setState(()=> {
        return { line: editorState.line};
      })
    });
  }

  public render() {
    const { line } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <BDoc key={1} data = {doc}/>
          {/* <Editor key={2} line={sampleLine}/> */}
          <Editor key={3} line={line}/>
        </div>
      </div>
    );
  }
}

export default App;
