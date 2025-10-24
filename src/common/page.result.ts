export class PageResult<T> {
  readonly data: T[];
  readonly currentPage: number;
  readonly size: number;
  readonly total: number;

  constructor(data: T[], currentPage: number, size: number, total: number) {
    this.data = data;
    this.currentPage = currentPage;
    this.size = size;
    this.total = total;
  }

  static of<T>(
    data: T[],
    currentPage: number,
    size: number,
    total: number,
  ): PageResult<T> {
    return new PageResult(data, currentPage, size, total);
  }
}
