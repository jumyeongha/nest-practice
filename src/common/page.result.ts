export class PageResult<T> {
  constructor(
    private readonly _data: T[],
    private readonly _currentPage: number,
    private readonly _size: number,
    private readonly _total: number,
  ) {}

  static of<T>(
    data: T[],
    currentPage: number,
    size: number,
    total: number,
  ): PageResult<T> {
    return new PageResult(data, currentPage, size, total);
  }

  get data(): T[] {
    return this._data;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get size(): number {
    return this._size;
  }

  get total(): number {
    return this._total;
  }
}
