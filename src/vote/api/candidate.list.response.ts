import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Candidate } from '../candidate';
import { CandidateResponse } from './candidate.response';

@ApiSchema({
  name: '[투표 후보자 목록 조회 응답 DTO]',
  description: '후보자 목록 응답 DTO 입니다.',
})
export class CandidateListResponse {
  @ApiProperty({
    type: () => CandidateResponse,
    isArray: true,
    description: '후보자 목록',
  })
  readonly candidates: CandidateResponse[];

  constructor(candidates: CandidateResponse[]) {
    this.candidates = candidates;
  }

  static from(candidates: Candidate[]): CandidateListResponse {
    const list: CandidateResponse[] = candidates.map((c) =>
      CandidateResponse.from(c),
    );

    return new CandidateListResponse(list);
  }
}