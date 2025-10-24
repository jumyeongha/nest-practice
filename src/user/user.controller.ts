import { UserService } from './user.service';
import { UserCreateRequest } from './dto/user.create.request';
import { UserResponse } from './dto/user.response';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('[유저]')
@Controller('api/usersff2f2f2f2f2f1f1f1f1f1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '유저 등록f2f2f2f2f2',
    description: '유저를 등록합니다.f3f3f3',
  })
  @ApiResponse({
    status: 200,
    description: 'f2f2f유저 f2f2f2등록 성공f1ff2f2f2f2f21f1f1',
    type: UserResponse,
  })
  @Post()
  register(@Body() request: UserCreateRequest): Promise<UserResponse> {
    return this.userService.register(request);
  }
}
