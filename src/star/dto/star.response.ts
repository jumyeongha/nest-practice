import { StarEntity } from '@prisma/client';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: '[스타 등록 응답 DTO]',
  description: '스타 등록 응답 DTO',
})
export class StarResponse {
  @ApiProperty({ example: 1, description: '스타 ID' })
  readonly id: number;

  @ApiProperty({ example: '유재석', description: '스타 이름' })
  readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static from(star: StarEntity): StarResponse {
    return new StarResponse(star.id, star.name);
  }
}
