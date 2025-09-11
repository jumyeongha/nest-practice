import { IsInt } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: '[투표 기록 요청 DTO]',
  description: '투표 기록 요청 DTO입니다.',
})
export class VotingLogCreateRequest {
  @ApiProperty({ description: '회원 ID', example: 1 })
  @IsInt()
  readonly userId: number;
}
