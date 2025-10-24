import { UserService } from './user.service';
import { UserCreateRequest } from './dto/user.create.request';
import { UserResponse } from './dto/user.response';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('[유저]')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '유저 등록',
    description: '유저를 등록합니다.11111',
  })
  @ApiResponse({
    status: 200,
    description: '유저 등록 성공',
    type: UserResponse,
  })
  @Post()
  register(@Body() request: UserCreateRequest): Promise<UserResponse> {
    return this.userService.register(request);
  }
}
