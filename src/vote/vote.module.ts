import { Module } from '@nestjs/common';
import { VoteController } from './api/vote.controller';
import { VoteService } from './vote.service';
import { PersistentModule } from '../infra/db/persistent.module';
import { CandidateService } from './candidate.service';
import { CandidateController } from './api/candidate.controller';
import { CandidateRepository } from './candidate.repository';
import { VoteRepository } from './vote.repository';
import { VotingLogService } from './voting.log.service';
import { VotingLogRepository } from './voting.log.repository';
import { VotingLogController } from './api/voting.log.controller';

@Module({
  imports: [PersistentModule],
  controllers: [VoteController, CandidateController, VotingLogController],
  providers: [
    VoteService,
    CandidateService,
    VoteRepository,
    CandidateRepository,
    VotingLogService,
    VotingLogRepository,
  ],
})
export class VoteModule {}
