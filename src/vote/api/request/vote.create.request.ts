import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@ApiSchema({
  name: '[투표 등록 요청 DTO]',
  description: '투표 등록 요청 DTO입니다.',
})
export class VoteCreateRequest {
  @ApiProperty({ description: '투표 제목', example: '1차 투표' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: '투표 시작 시간',
    example: '2025-09-11T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  readonly startedAt: Date;

  @ApiProperty({
    description: '투표 만료 시간',
    example: '2025-09-11T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  readonly endedAt: Date;
}
