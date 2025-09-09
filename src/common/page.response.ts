import { PageResult } from './page.result';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: '[페이지네이션 응답 DTO]',
  description: '페이지네이션 응답 DTO입니다.',
})
export class PageResponse<T> {
  @ApiProperty({
    description: '목록 데이터',
    isArray: true,
  })
  readonly data: T[];

  @ApiProperty({ example: 1, description: '현재 페이지' })
  readonly currentPage: number;

  @ApiProperty({ example: 20, description: '페이지 크기' })
  readonly size: number;

  @ApiProperty({ example: 123, description: '전체 개수' })
  readonly total: number;

  constructor(data: T[], currentPage: number, size: number, total: number) {
    this.data = data;
    this.currentPage = currentPage;
    this.size = size;
    this.total = total;
  }

  static convert<T, R>(
    source: PageResult<T>,
    fn: (it: T) => R,
  ): PageResponse<R> {
    const result: R[] = source.data.map(fn);

    return new PageResponse<R>(
      result,
      source.currentPage,
      source.size,
      source.total,
    );
  }
}
