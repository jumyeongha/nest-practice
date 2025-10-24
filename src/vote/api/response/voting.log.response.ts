import { VotingLog } from '../../domain/voting.log';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: '[투표 성공 응답 DTO]',
  description: '투표 성공 응답 DTO 입니다.',
})
export class VotingLogResponse {
  @ApiProperty({ example: 1, description: '투표로그 ID' })
  id: number | null;

  @ApiProperty({ example: 1, description: '투표 ID' })
  voteId: number;

  @ApiProperty({ example: 1, description: '후보자 ID' })
  candidateId: number;

  @ApiProperty({ example: 1, description: '유저 ID' })
  userId: number;

  @ApiProperty({ example: 1, description: '투표 날짜' })
  votedAt: Date;

  constructor(
    id: number | null,
    voteId: number,
    candidateId: number,
    userId: number,
    votedAt: Date,
  ) {
    this.id = id;
    this.voteId = voteId;
    this.candidateId = candidateId;
    this.userId = userId;
    this.votedAt = votedAt;
  }

  static from(votingLog: VotingLog): VotingLogResponse {
    return new VotingLogResponse(
      votingLog.id,
      votingLog.voteId,
      votingLog.candidateId,
      votingLog.userId,
      votingLog.votedAt,
    );
  }
}
