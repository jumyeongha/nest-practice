import { Candidate } from '../candidate';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: '[투표 후보자 조회 응답 DTO]',
  description: '후보자 + 득표수 입니다.',
})
export class CandidateResponse {
  @ApiProperty({ example: 1, description: '후보자 ID' })
  readonly id: number;

  @ApiProperty({ example: 3, description: '스타 ID' })
  readonly starId: number;

  @ApiProperty({ example: '김스타', description: '후보자 이름' })
  readonly name: string;

  @ApiProperty({ example: 12, description: '득표 수' })
  readonly voteCount: number;

  constructor(id: number, starId: number, name: string, voteCount: number) {
    this.id = id;
    this.starId = starId;
    this.name = name;
    this.voteCount = voteCount;
  }

  static from(candidate: Candidate): CandidateResponse {
    return new CandidateResponse(
      candidate.id,
      candidate.starId,
      candidate.name,
      candidate.voteCount,
    );
  }
}
