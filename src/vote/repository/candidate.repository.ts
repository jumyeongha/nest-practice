import { Candidate } from '../domain/candidate';
import { Injectable } from '@nestjs/common';
import { CandidateEntity, StarEntity } from '@prisma/client';
import { PrismaService } from '../../infra/db/prisma/prisma.service';

@Injectable()
export class CandidateRepository {
  private readonly DEFAULT_VOTE_COUNT: number = 0;

  constructor(private readonly prisma: PrismaService) {}

  findManyByVoteId(voteId: number): Promise<CandidateEntity[]> {
    return this.prisma.candidateEntity.findMany({
      where: { voteId: voteId },
    });
  }

  async findOneById(id: number): Promise<Candidate | null> {
    const candidateEntity: CandidateEntity | null =
      await this.prisma.candidateEntity.findUnique({
        where: { id: id },
      });

    if (!candidateEntity) {
      return null;
    }

    const starEntity: StarEntity | null =
      await this.prisma.starEntity.findUnique({
        where: { id: candidateEntity.starId },
      });

    if (!starEntity) {
      return null;
    }

    return Candidate.create(
      candidateEntity.id,
      candidateEntity.starId,
      starEntity.name,
      candidateEntity.voteCount,
    );
  }

  async updateVoteCount(candidate: Candidate): Promise<void> {
    await this.prisma.candidateEntity.update({
      where: {
        id: candidate.id,
      },
      data: {
        voteCount: candidate.voteCount,
      },
    });
  }

  async search(voteId: number, keyword: string): Promise<Candidate[]> {
    const candidateWithStar = await this.prisma.candidateEntity.findMany({
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

    return candidateWithStar.map((c) =>
      Candidate.create(c.id, c.starId, c.starEntity.name, c.voteCount),
    );
  }

  async save(voteId: number, starId: number): Promise<void> {
    await this.prisma.candidateEntity.create({
      data: {
        voteId: voteId,
        voteCount: this.DEFAULT_VOTE_COUNT,
        starEntity: { connect: { id: starId } },
      },
    });
  }
}
