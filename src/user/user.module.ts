import { Module } from '@nestjs/common';
import { PersistentModule } from '../infra/db/persistent.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [PersistentModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
