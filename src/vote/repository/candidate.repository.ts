import { CandidateWithStarName } from '../domain/candidate';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/db/prisma/prisma.service';

@Injectable()
export class CandidateRepository {
  private readonly DEFAULT_VOTE_COUNT: number = 0;

  constructor(private readonly prisma: PrismaService) {}

  findManyByVoteId(voteId: number): Promise<CandidateWithStarName[]> {
    return this.prisma.candidateEntity.findMany({
      where: { voteId: voteId },
      include: {
        starEntity: { select: { name: true } },
      },
    });
  }

  findOneById(id: number): Promise<CandidateWithStarName | null> {
    return this.prisma.candidateEntity.findUnique({
      where: { id: id },
      include: {
        starEntity: { select: { name: true } },
      },
    });
  }

  async updateVoteCount(candidateId: number): Promise<void> {
    await this.prisma.candidateEntity.update({
      where: {
        id: candidateId,
      },
      data: {
        voteCount: { increment: 1 },
      },
    });
  }

  search(voteId: number, keyword?: string): Promise<CandidateWithStarName[]> {
    return this.prisma.candidateEntity.findMany({
      where: {
        voteId: voteId,
        starEntity: {
          is: {
            name: { contains: keyword },
          },
        },
      },
      include: { starEntity: { select: { name: true } } },
    });
  }

  async save(voteId: number, starId: number): Promise<void> {
    await this.prisma.candidateEntity.create({
      data: {
        voteId: voteId,
        voteCount: this.DEFAULT_VOTE_COUNT,
        starId: starId,
      },
    });
  }
}
