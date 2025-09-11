import { Module } from '@nestjs/common';
import { VoteController } from './api/vote.controller';
import { VoteService } from './vote.service';
import { PersistentModule } from '../infra/db/persistent.module';
import { VoteRepository } from './repository/vote.repository';
import { CandidateController } from './api/candidate.controller';
import { VotingLogController } from './api/voting.log.controller';
import { CandidateService } from './candidate.service';
import { CandidateRepository } from './repository/candidate.repository';
import { VotingLogService } from './voting.log.service';
import { VotingLogRepository } from './repository/voting.log.repository';
import { StarModule } from '../star/star.module';

@Module({
  imports: [PersistentModule, StarModule],
  controllers: [VoteController, CandidateController, VotingLogController],
  providers: [
    VoteService,
    VoteRepository,
    CandidateService,
    CandidateRepository,
    VotingLogService,
    VotingLogRepository,
  ],
})
export class VoteModule {}
