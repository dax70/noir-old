import { Iterable, Iterator , IteratorResult } from './Iterable';

const message = {
  failure: 'Failure: non-existent node in this list.'
};

/* Doubly LinkedList */
export type LinkedNode<T> = {
  value: T;
  previous?: LinkedNode<T>;
  next?: LinkedNode<T>;
};

export type Dictionary<T>  = {
  [key: string]: T;
};

export type List<T> = Iterable<T> & {
  length: number;

  add(item: T): void;

}

export class LinkedList<T> implements List<T>, Iterable<T> {
    // tslint:disable-next-line:variable-name
    _length = 0;
    head?: LinkedNode<T>;
    tail?: LinkedNode<T>;

    constructor() {
      //
    }

    get(index: number) {
      let counter = 0;
      let element = this.head;

      while (counter < index) {
        if (element) {
          element = element.next;
          counter++;
        }
      }

      if (element) {
        return element.value;
      }

      return null;
  }

    get length() {
      return this._length;
    }

    [Symbol.iterator](): Iterator<T> {
        return new LinkedListIterator<T>(this.head);
    }

    add(value: T) {
      const node: LinkedNode<T> = { value };
      const { tail, _length} = this;

      if (_length && tail) {
        // append at end
        tail.next = node;
        // set previous of node
        node.previous = tail;
        // set new tail
        this.tail = node;
      } else {
          this.head = node;
          this.tail = node;
      }

      this._length++;
      return node;
    }

    // addFirst(value) {
    //   let newNode = new Node(value);
    //   this.first = newNode;
    // }
    // addAfter(newValue, beforeValue) {
    //   let newNode = new Node(newValue);
    //   let beforeNode = this.find(beforeValue);
    //   newNode.next = beforeNode.next;
    //   beforeNode.next = newNode;
    // }

    find(position: number) {
      let count = 1;
      // tslint:disable-next-line:prefer-const
      let { head: currentNode, _length } = this;

      // 1st use-case: an invalid position
      if (_length === 0 || position < 1 || position > _length) {
          throw new Error(message.failure);
      }

      // 2nd use-case: a valid position
      while (currentNode && count < position) {
          currentNode = currentNode.next;
          count++;
      }

      return currentNode;
    }

    // find(position: number) : LinkedNode<T>;
    // find(value: T): LinkedNode<T>;
    // find(param: any) {

    //   if (param && typeof param === 'number') {
    //     //
    //   }
    //   else if(param instanceof T) {
    //     //
    //   }

    //   let node = this.head;

    //   while (node && node.value !== param) {
    //     node = node.next;
    //   }

    //   return node;
    // }

    remove(position: number) {
      this._length--;
    }

}

class LinkedListIterator<T> implements Iterator<T> {
    linkedNode?: LinkedNode<T>;

    constructor (linkedNode?: LinkedNode<T>) {
        this.linkedNode = linkedNode;
    }

    next(): IteratorResult<T> {
      const node = this.linkedNode;

      if (node) {
        this.linkedNode = node.next;
        return { value: node.value, done: false };
      }
      return { done: true };
    }
  }
