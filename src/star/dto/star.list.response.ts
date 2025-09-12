import { StarResponse } from './star.response';
import { StarEntity } from '@prisma/client';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { CandidateResponse } from '../../vote/api/response/candidate.response';

@ApiSchema({
  name: '[스타 목록 조회 응답 DTO]',
  description: '스타 목록 응답 DTO 입니다.',
})
export class StarListResponse {
  @ApiProperty({
    type: () => CandidateResponse,
    isArray: true,
    description: '스타 목록',
  })
  readonly stars: StarResponse[];

  constructor(stars: StarResponse[]) {
    this.stars = stars;
  }
  static from(starEntities: StarEntity[]): StarListResponse {
    const starResponses: StarResponse[] = starEntities.map((s) =>
      StarResponse.from(s),
    );

    return new StarListResponse(starResponses);
  }
}
