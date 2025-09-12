import { UserEntity } from '@prisma/client';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: '[유저 등록 응답 DTO]',
  description: '유저 등록 응답 DTO',
})
export class UserResponse {
  @ApiProperty({ example: 1, description: '유저 ID' })
  readonly id: number;

  @ApiProperty({ example: 'user1@user1.com', description: '유저 email' })
  readonly email: string;

  @ApiProperty({ example: 'user1', description: '유저 비밀번호' })
  readonly password: string;

  @ApiProperty({ example: 'user1', description: '유저 이름' })
  readonly name: string;

  constructor(id: number, email: string, password: string, name: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
  }

  static from(user: UserEntity): UserResponse {
    return new UserResponse(user.id, user.email, user.password, user.name);
  }
}
