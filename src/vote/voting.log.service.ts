import { Injectable, NotFoundException } from '@nestjs/common';
import { VotingLogRepository } from './voting.log.repository';
import { VotingLog } from './voting.log';
import { Vote } from './vote';
import { VoteRepository } from './vote.repository';
import { CandidateRepository } from './candidate.repository';
import { Candidate } from './candidate';

@Injectable()
export class VotingLogService {
  constructor(
    private readonly votingLogRepository: VotingLogRepository,
    private readonly voteRepository: VoteRepository,
    private readonly candidateRepository: CandidateRepository,
  ) {}

  async vote(
    userId: number,
    voteId: number,
    candidateId: number,
  ): Promise<VotingLog> {
    //투표 존재 유무 확인
    const vote: Vote | null = await this.voteRepository.findById(voteId);

    if (!vote) {
      throw new NotFoundException('투표가 존재하지 않습니다.');
    }

    //후보자 존재 유무 확인
    const candidate: Candidate | null =
      await this.candidateRepository.findOneById(candidateId);

    if (!candidate) {
      throw new NotFoundException('후보자가 존재하지 않습니다.');
    }

    //투표
    const votingLog: VotingLog = VotingLog.create(
      null,
      voteId,
      candidateId,
      userId,
      new Date(),
    );
    candidate.increaseVoteCount();
    const savedVotingLog: VotingLog =
      await this.votingLogRepository.save(votingLog);

    await this.candidateRepository.updateVoteCount(candidate);

    return savedVotingLog;
  }
}
