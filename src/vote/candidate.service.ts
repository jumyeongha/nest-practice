import { Injectable } from '@nestjs/common';
import { CandidateWithStarName } from './domain/candidate';
import { CandidateRepository } from './repository/candidate.repository';

@Injectable()
export class CandidateService {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async getCandidates(voteId: number): Promise<CandidateWithStarName[]> {
    return await this.candidateRepository.findManyByVoteId(voteId);
  }

  async search(
    voteId: number,
    keyword?: string,
  ): Promise<CandidateWithStarName[]> {
    return await this.candidateRepository.search(voteId, keyword);
  }

  async register(voteId: number, starId: number): Promise<void> {
    await this.candidateRepository.save(voteId, starId);
  }
}
