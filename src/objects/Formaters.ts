import { URIRef, ValueType } from './core';

type StyleRef = ValueType & {
  kind: 'style'
}
type Reference = URIRef | StyleRef;

type RefPostion = number;

type Ref = Reference | RefPostion;

type Color = string;

type fontStyle = 'normal' | 'italic' | 'oblique';

type weightValues = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type fontWeight = 'normal'| 'bold' | 'bolder' | 'lighter'| weightValues;

type Style  = {
  color: Color
  backgroundColor: string
  fontStyle: fontStyle
  fontWeight: fontWeight
};

type MarkerStyle = Style | Ref;

type MarkerLocation = {
  start: number,
  length: number
};

type Marker = {
  location: MarkerLocation,
  style: MarkerStyle | Array<MarkerStyle>
};

type TextFormat = {
  kind: 'text'
  markers: Marker | Array<Marker>
};

type VideoFormat = {
  kind: 'video'
}

type Format = TextFormat | VideoFormat;

export {
  Format,
  StyleRef,
  Reference,
  RefPostion,
  Ref,
  Color,
  Style,
  MarkerStyle,
  MarkerLocation,
  TextFormat,
  VideoFormat
}
