import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCreateRequest } from './dto/user.create.request';
import { UserResponse } from './dto/user.response';
import { UserEntity } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(request: UserCreateRequest): Promise<UserResponse> {
    const user: UserEntity = await this.userRepository.save(request);
    return UserResponse.from(user);
  }
}
