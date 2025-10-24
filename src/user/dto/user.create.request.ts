import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: '[유저 등록 요청 DTO]',
  description: '유저 등록 요청 DTO입니다.',
})
export class UserCreateRequest {
  @ApiProperty({ description: '유저 email', example: 'user1@user.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: '비밀번호', example: 'user1' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ description: '유저 이름', example: 'user1' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
