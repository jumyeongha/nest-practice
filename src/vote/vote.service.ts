import { Injectable, NotFoundException } from '@nestjs/common';
import { Vote } from './domain/vote';
import { VoteRepository } from './repository/vote.repository';
import { VoteStatus } from './domain/vote.status';
import { PageResult } from '../common/page.result';
import { VoteCreateRequest } from './api/request/vote.create.request';
import { VoteResponse } from './api/response/vote.response';
import { VoteEntity } from '@prisma/client';

@Injectable()
export class VoteService {
  constructor(private readonly voteRepository: VoteRepository) {}

  async getVote(id: number): Promise<Vote> {
    const vote: Vote | null = await this.voteRepository.findById(id);

    if (!vote) {
      throw new NotFoundException('투표가 존재하지 않습니다.');
    }

    return vote;
  }

  async getVotes(
    page: number,
    size: number,
    staus: VoteStatus,
  ): Promise<PageResult<Vote>> {
    return await this.voteRepository.findManyBy(page, size, staus);
  }

  async register(request: VoteCreateRequest): Promise<VoteResponse> {
    const vote: VoteEntity = await this.voteRepository.save(request);
    return VoteResponse.fromEntity(vote);
  }
}
