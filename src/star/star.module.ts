import { Module } from '@nestjs/common';
import { PersistentModule } from '../infra/db/persistent.module';
import { StarController } from './star.controller';
import { StarService } from './star.service';
import { StarRepository } from './star.repository';

@Module({
  imports: [PersistentModule],
  controllers: [StarController],
  providers: [StarService, StarRepository],
  exports: [StarRepository],
})
export class StarModule {}
