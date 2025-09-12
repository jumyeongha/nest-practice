import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/db/prisma/prisma.service';
import { UserEntity } from '@prisma/client';
import { UserCreateRequest } from './dto/user.create.request';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  save(createRequest: UserCreateRequest): Promise<UserEntity> {
    return this.prisma.userEntity.create({
      data: {
        email: createRequest.email,
        password: createRequest.password,
        name: createRequest.name,
      },
    });
  }
}
