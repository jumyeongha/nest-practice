import { Vote } from '../vote';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { VoteStatus } from '../vote.status';

@ApiSchema({
  name: '[투표 상세 조회 응답 DTO]',
  description: '투표 상세조회 DTO입니다.',
})
export class VoteResponse {
  @ApiProperty({ description: '투표 ID', example: 1 })
  readonly id: number | null;

  @ApiProperty({ description: '투표 제목', example: '오늘 점심 투표' })
  readonly title: string;

  @ApiProperty({
    example: 'active',
    description: '투표 상태',
  })
  readonly status: VoteStatus;

  @ApiProperty({
    example: '2025-09-08T12:00:00.000Z',
    description: '시작 시간',
  })
  readonly startedAt: Date;

  @ApiProperty({
    example: '2025-09-08T15:00:00.000Z',
    description: '종료 시간',
  })
  readonly endedAt: Date;

  constructor(
    id: number | null,
    title: string,
    status: VoteStatus,
    startedAt: Date,
    endedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
  }

  static from(vote: Vote): VoteResponse {
    return new VoteResponse(
      vote.id,
      vote.title,
      vote.status,
      vote.startedAt,
      vote.endedAt,
    );
  }
}
