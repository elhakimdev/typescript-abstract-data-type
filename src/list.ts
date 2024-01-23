/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
export interface AbstractList<List> {
  /**
   * Determine Number of elements in list
   * @date 1/23/2024 - 12:53:11 PM
   *
   * @public
   * @property
   * @type {number}
   */
  size: number;

  /**
   * Determine Current position in list.
   * @date 1/23/2024 - 12:54:00 PM
   *
   * @public
   * @property
   * @type {number}
   */
  position: number;

  /**
   * Determine a properties that Returns the number of elements in list
   * @date 1/23/2024 - 12:54:36 PM
   *
   * @public
   * @property
   * @type {number}
   */
  length: number;

  /**
   * Clears all elements from list
   * @date 1/23/2024 - 1:18:34 PM
   *
   * @public
   * @property
   * @type {() => void}
   */
  clear: () => void;

  /**
   * Retrieving a List’s Elements in string representation
   * @date 1/23/2024 - 1:28:05 PM
   *
   * @type {() => string}
   */
  toString: () => string;

  /**
   * Returns element at current position
   * @date 1/23/2024 - 1:41:08 PM
   *
   * @public
   * @property
   * @type {() => List}
   */
  getElement: () => List;

  insert: (
    element: List extends any ? List : never,
    after?: List extends any ? List : never,
  ) => List | boolean | undefined;

  /**
   * Add new element to end of list
   * @date 1/23/2024 - 1:14:59 PM
   *
   * @public
   * @method
   * @type {(element: List) => void}
   * @returns void
   */
  append: (element: List) => void;

  /**
   * Add new multiple element to end of list
   * @date 1/23/2024 - 1:16:13 PM
   *
   * @public
   * @method
   * @type {(elements: List[]) => void}
   */
  appends: (elements: List[]) => void;

  /**
   * Finding and given element in a list and return the List
   * @date 1/23/2024 - 1:45:03 PM
   *
   * @public
   * @method
   * @param {(value: List, index: number, obj: List[]) => unknown} predicate
   * @param {?*} [thisArg]
   * @returns {(List | undefined)}
   */
  find(
    predicate: (value: List, index: number, obj: List[]) => unknown,
    thisArg?: any,
  ): List | undefined;

  /**
   * Removes element from list
   * @date 1/23/2024 - 1:48:58 PM
   *
   * @type {(element: List) => boolean}
   */
  remove: (element: List) => boolean;

  // front (function) // Sets current position to first element of list
  // front: Function
  // end (function) // Sets current position to last element of list
  // end: Function;
  // prev (function) // Moves current position back one element
  // previous: Function;
  // next (function) // Moves current position forward one element
  // next: Function;
  // currPos (function) // Returns the current position in list
  // current: Function;
  // moveTo (function) // Moves the current position to specified position
  // moveTo: Function;
}

export class List<T> implements AbstractList<T extends any ? T : never> {
  public size: number = 0;
  public position: number = 0;
  public length = 0;
  private _context: Array<T> = [];

  public clear() {
    this._context = [];
    this.size = this.position = this.length = 0;
  }

  public getElement(): T extends any ? T : never {
    return this.context[this.position];
  }

  public insert(
    element: (T extends any ? T : never) extends any
      ? T extends any
        ? T
        : never
      : never,
    after?:
      | ((T extends any ? T : never) extends any
          ? T extends any
            ? T
            : never
          : never)
      | undefined,
  ): boolean | (T extends any ? T : never) | undefined {
    // if ``after`` argument given, doing some computation befoere inserting.
    if (after) {
      const foundAfter = this.find((el) => this.isEquals(el, after as T));
      const afterId = this._context.indexOf(foundAfter as T);
      this.context.splice(afterId + 1, 0, element);
      ++this.size;
      ++this.length;
      return true;
    }

    // other wise just append that element at the end of list and check again that record is found then return as booleans
    this.append(element);
    const aftterInsert = this.find((e) => this.isEquals(e, element));
    return !!aftterInsert;
  }

  public append(element: T extends any ? T : never): void {
    this.context[this.size++] = element;
    this.length = this.context.length;
  }

  public appends(elements: (T extends any ? T : never)[]) {
    for (const e of elements) {
      this.append(e);
    }
  }

  public find(
    predicate: (
      value: T extends any ? T : never,
      index: number,
      obj: (T extends any ? T : never)[],
    ) => unknown,
  ) {
    return this.context.find((e, i) => predicate(e, i, this.context));
  }

  private isEquals(
    obj: T extends any ? T : never,
    targetObj: T extends any ? T : never,
  ): boolean {
    // @ts-expect-error
    return Object.keys(obj).every((k) => obj[k] === targetObj[k]);
  }

  public remove(element: T extends any ? T : never): boolean {
    const found = this.find((el) => this.isEquals(el, element));
    if (this.context.includes(found as T)) {
      this.context.splice(this.context.indexOf(found as T));
      --this.size;
      return true;
    }
    return false;
  }

  public toString(): string {
    return this.context.toLocaleString();
  }

  public get context(): T[] {
    return this._context;
  }

  public set context(ctx: T | T[]) {
    if (Array.isArray(ctx)) {
      this.appends(ctx);
    }

    this.append(ctx as T);
  }
}
