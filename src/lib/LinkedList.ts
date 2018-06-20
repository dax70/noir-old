import { Iterable, Iterator , IteratorResult } from './Iterable';

const message = {
  outOfRange: 'The position is greater than the length of the list.'
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

  get(index: number) : T | null;

  find(value: number | T): any;

  removeAt(position: number): void;

  first(): T | null;

  last(): T | null;
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

    add(value: T): LinkedNode<T> {
      const { tail, _length} = this;
      const node: LinkedNode<T> = { value };
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

    first() {
      const { head } = this;
      if(head) {
        return head.value;
      }

      return null;
    }

    last() {
      const { tail } = this;
      if(tail) {
        return tail.value;
      }

      return null;
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

    findAt(position: number) {
      let count = 1;
      // tslint:disable-next-line:prefer-const
      let { head: currentNode, _length } = this;

      // 1st use-case: an invalid position
      if (_length === 0 || position < 1 || position > _length) {
          throw new Error(message.outOfRange);
      }

      // 2nd use-case: a valid position
      while (currentNode && count < position) {
          currentNode = currentNode.next;
          count++;
      }

      return currentNode;
    }

    findNode(node: LinkedNode<T>) {
      if (!node) {
        return null;
      }

      let currentNode = this.head;

      while (currentNode && currentNode.value !== node.value) {
          currentNode = currentNode.next;
      }

      return currentNode;
    }

    find(position: number): any;
    find(node: LinkedNode<T>): any;
    find(value: number | LinkedNode<T>): any {
      if (typeof value === 'number') {
        this.findAt(value);
      }
      else {
        this.findNode(value)
      }
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

    remove(node: LinkedNode<T>) {
      let { head, tail } = this;

      if(node) {
        // bind node after to prevs
        const { next, previous } = node;

        if(previous) {
          previous.next = next;
        }

        if(next) {
          next.previous = previous;
        }

        if(head === node) {
          head = node.next;
        }

        if(tail === node) {
          tail = node.previous;
        }

        delete node.next;
        delete node.previous;
        delete node.value;

        this._length--;
      }
    }

    removeAt(position: number) {
      const node = this.find(position);
      if(node) {
        this.remove(node);
      }
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
