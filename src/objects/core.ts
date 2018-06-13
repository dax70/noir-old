type ValueType = {
  value: object
}

type URIRef = {
  kind: 'uri',
  src: string
};

type Unit = number | string;

export {
  ValueType,
  URIRef,
  Unit
}
