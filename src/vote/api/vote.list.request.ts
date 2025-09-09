import { VoteStatus } from '../vote.status';
import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: '[투표 목록 조회 요청 DTO]',
  description: '투표 목록 조회 요청 DTO입니다.',
})
export class VoteListRequest {
  @ApiProperty({ description: '페이지 number', example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(15)
  readonly page: number = 1;

  @ApiProperty({ description: 'size', example: 5 })
  @Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(15)
  readonly size: number = 5;

  @ApiProperty({
    description: '투표 상태',
    example: 'active',
    enum: VoteStatus,
  })
  @IsEnum(VoteStatus)
  readonly status: VoteStatus = VoteStatus.ACTIVE;
}
