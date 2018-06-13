
export type IteratorResult<T> = {
    done: boolean;
    value?: T;
  };

export type Iterator<T> = {
    next(value?: {}): IteratorResult<T>;
    // return?(value?: {}): IteratorResult<T>;
    // throw?(e?: {}): IteratorResult<T>;
};

export type Iterable<T>  = {
    [Symbol.iterator](): Iterator<T>;
};
