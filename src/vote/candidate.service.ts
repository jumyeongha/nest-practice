import { Injectable } from '@nestjs/common';
import { Candidate } from './domain/candidate';
import { CandidateRepository } from './repository/candidate.repository';
import { CandidateEntity, StarEntity } from '@prisma/client';
import { StarRepository } from '../star/star.repository';

@Injectable()
export class CandidateService {
  constructor(
    private readonly candidateRepository: CandidateRepository,
    private readonly starRepository: StarRepository,
  ) {}

  async getCandidates(voteId: number): Promise<Candidate[]> {
    // 후보자 목록 조회
    const candidateEntities: CandidateEntity[] =
      await this.candidateRepository.findManyByVoteId(voteId);

    const starIds: number[] = candidateEntities.map(
      (candidateEntity) => candidateEntity.starId,
    );

    // 스타 목록 조회
    const starEntities: StarEntity[] =
      await this.starRepository.findManyByIds(starIds);

    // 조합
    return Candidate.listFrom(candidateEntities, starEntities);
  }

  async search(voteId: number, keyword: string): Promise<Candidate[]> {
    return await this.candidateRepository.search(voteId, keyword);
  }

  async register(voteId: number, starId: number): Promise<void> {
    await this.candidateRepository.save(voteId, starId);
  }
}
