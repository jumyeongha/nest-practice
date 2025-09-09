import { Injectable } from '@nestjs/common';
import { Candidate } from './candidate';
import { CandidateRepository } from './candidate.repository';

@Injectable()
export class CandidateService {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async getCandidates(voteId: number): Promise<Candidate[]> {
    return await this.candidateRepository.findManyByVoteId(voteId);
  }

  async search(voteId: number, keyword: string): Promise<Candidate[]> {
    return await this.candidateRepository.search(voteId, keyword);
  }
}
