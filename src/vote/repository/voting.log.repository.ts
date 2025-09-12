import { PrismaService } from '../../infra/db/prisma/prisma.service';
import { VotingLog } from '../domain/voting.log';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VotingLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  save({
    voteId,
    candidateId,
    userId,
    now,
  }: {
    voteId: number;
    candidateId: number;
    userId: number;
    now: Date;
  }): Promise<VotingLog> {
    return this.prisma.votingLogEntity.create({
      data: {
        voteId: voteId,
        candidateId: candidateId,
        userId: userId,
        votedAt: now,
      },
    });
  }
}
