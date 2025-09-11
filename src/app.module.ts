import { Module } from '@nestjs/common';
import { VoteModule } from './vote/vote.module';
import { UserModule } from './user/user.module';
import { StarModule } from './star/star.module';

@Module({
  imports: [VoteModule, UserModule, StarModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
