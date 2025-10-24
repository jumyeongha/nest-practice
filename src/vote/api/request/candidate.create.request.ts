import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

@ApiSchema({
  name: '[후보자 등록 요청 DTO]',
  description: '후보자 등록 요청 DTO 입니다.',
})
export class CandidateCreateRequest {
  @ApiProperty({ description: '스타 ID', example: '123' })
  @IsInt()
  @Type(() => Number)
  readonly starId: number;

  constructor(starId: number) {
    this.starId = starId;
  }
}
