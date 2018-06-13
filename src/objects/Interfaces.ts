import { Unit } from './core';
import { Ref, Reference, TextFormat } from './Formaters';

type Dimension = {
  height: Unit,
  width: Unit
}

type TextSpan = {
  kind: 'text',
  content: string
}

type Image = Dimension & {
  kind: 'img',
  src: Ref
}

type Video = Dimension & {
  kind: 'img',
  src: Ref
}

type Container = {
  kind: 'container',
  children: Array<Interface>
}

type Interface = TextSpan | Image | Video | Container;

type Doc  = {
  refs: Array<Reference>;
  format: Array<TextFormat>;
  root: Interface;
};

export {
  Unit,
  Dimension,
  TextSpan,
  Image,
  Video,
  Container,
  Interface,
  Doc
}
