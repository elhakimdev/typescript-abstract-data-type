/* eslint-disable @typescript-eslint/no-unused-vars */
export interface AbstractIterator<T> extends Iterable<T> {
  length: number;
  position: number;
  /**
   * Sets current position to first element of list
   * @date 1/23/2024 - 7:19:12 PM
   *
   * @type {() => this}
   */
  first: () => this;
  
  /**
   * Sets current position to last element of list
   * @date 1/23/2024 - 7:19:25 PM
   *
   * @type {() => this}
   */
  last: () => this;
  
  /**
   * Moves current position back one element
   * @date 1/23/2024 - 7:20:09 PM
   *
   * @type {() => this}
   */
  previous: () => this;
  
  /**
   * Moves current position forward one element
   * @date 1/23/2024 - 7:20:25 PM
   *
   * @type {() => this}
   */
  next: () => this;
  
  /**
   * Returns the current position in list
   * @date 1/23/2024 - 7:20:39 PM
   *
   * @type {() => number}
   */
  current: () => number;
  
  /**
   * Moves the current position to specified position
   * @date 1/23/2024 - 7:21:14 PM
   *
   * @type {(position: number) => void}
   */
  moveTo: (position: number) => void;
}

export class AbstractListIterator<List> implements AbstractIterator<List> {
  [Symbol.iterator](): Iterator<List, any, undefined> {
    throw new Error("Method not implemented.");
  }

  public length = 0;
  public position = 0;
  public first(): this {
    this.position = 0;
    return this;
  }

  public next(): this{
    // this.position
    if(this.position < this.length -1){
      ++this.position
    }
    return this;
  }

  public previous(): this{
    if(this.position > 0){
      --this.position;
    }
    return this;
  }

  public current () {
    return this.position;
  }

  public last(): this{
    this.position = this.length - 1;
    return this;
  }

  public moveTo  (position: number): this {
    this.position = position - 1;
    return this;
  }
}