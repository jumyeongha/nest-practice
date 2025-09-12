import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({
  name: '[스타 등록 요청 DTO]',
  description: '스타 등록 요청 DTO입니다.',
})
export class StarCreateRequest {
  @ApiProperty({ description: '스타 이름', example: '유재석' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
