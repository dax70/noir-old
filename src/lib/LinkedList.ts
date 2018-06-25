import { Iterable, Iterator , IteratorResult } from './Iterable';

const message = {
  outOfRange: 'The position is greater than the length of the list.'
};

/* Doubly LinkedList */
export type LinkedNode<T> = {
  previous?: T;
  next?: T;
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

export class LinkedList<T extends LinkedNode<T>> implements Iterable<T> {
    // tslint:disable-next-line:variable-name
    _length = 0;
    head?: T;
    tail?: T;

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
        return element;
      }

      return null;
  }

    get length() {
      return this._length;
    }

    [Symbol.iterator](): Iterator<T> {
        return new LinkedListIterator<T>(this.head);
    }

    add(node: T){
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
    }

    first() {
      const { head } = this;
      if(head) {
        return head;
      }

      return null;
    }

    last() {
      const { tail } = this;
      if(tail) {
        return tail;
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

    findNode(node: T) {
      if (!node) {
        return null;
      }

      let currentNode = this.head;

      while (currentNode && currentNode !== node) {
          currentNode = currentNode.next;
      }

      return currentNode;
    }

    find(value: number | T): any {
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
      if (!node) {
        throw new Error('Can not remove Node of null or undefined');
      }

      const { head, tail } = this;
      // bind node after to prevs
      const { next, previous } = node;

      // only one node?
      if (node === head && node === tail) {
        delete this.head;
        delete this.tail;
      }
      // if node to be removed is head
      else if (node === head) {
        const candidate = node.next;
        if (candidate && candidate.previous) {
          // this is now head - remove any dangling to previous
          delete candidate.previous;
        }

        this.head = candidate;
      }
      // if node to be removed is tail
      else if(node === tail) {
        const candidate = node.previous;
        if (candidate && candidate.next) {
          // this is now tail - remove dangling to next
          delete candidate.next;
        }

        this.tail = candidate;
      }
      else {
        if (!previous) {
          throw new Error('There should always be a previous');
        }

        if (!next) {
          throw new Error('There should always be a next');
        }

        previous.next = next;
        next.previous = previous;
      }

      delete node.next;
      delete node.previous;

      this._length--;
    }

    removeAt(position: number) {
      const node = this.find(position);
      if(node) {
        this.remove(node);
      }
    }

}

class LinkedListIterator<T extends LinkedNode<T>> implements Iterator<T> {
    linkedNode?: T;

    constructor (linkedNode?: T) {
        this.linkedNode = linkedNode;
    }

    next(): IteratorResult<T> {
      const node = this.linkedNode;

      if (node) {
        this.linkedNode = node.next;
        return { value: node, done: false };
      }
      return { done: true };
    }
  }
