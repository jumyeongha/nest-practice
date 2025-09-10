import { PrismaService } from '../infra/db/prisma/prisma.service';
import { VotingLog } from './voting.log';
import { VotingLogEntity } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VotingLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(votingLog: VotingLog): Promise<VotingLog> {
    const votingLogEntity: VotingLogEntity =
      await this.prisma.votingLogEntity.create({
        data: {
          voteId: votingLog.voteId,
          candidateId: votingLog.candidateId,
          userId: votingLog.userId,
          votedAt: votingLog.votedAt,
        },
      });

    return VotingLog.create(
      votingLogEntity.id,
      votingLogEntity.voteId,
      votingLogEntity.candidateId,
      votingLogEntity.userId,
      votingLogEntity.votedAt,
    );
  }
}
