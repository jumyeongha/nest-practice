import { Candidate } from './candidate';
import { PrismaService } from '../infra/db/prisma/prisma.service';
import { CandidateEntity, StarEntity } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CandidateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByVoteId(voteId: number): Promise<Candidate[]> {
    const candidateEntities: CandidateEntity[] =
      await this.prisma.candidateEntity.findMany({
        where: { voteId: voteId },
      });

    const starIds: number[] = candidateEntities.map(
      (candidateEntity) => candidateEntity.starId,
    );

    const statEntities: StarEntity[] = await this.prisma.starEntity.findMany({
      where: {
        id: {
          in: starIds,
        },
      },
    });

    const starMap = new Map<number, StarEntity>(
      statEntities.map((s) => [s.id, s] as [number, StarEntity]),
    );

    return candidateEntities
      .map((e) => {
        const starEntity = starMap.get(e.starId);
        if (starEntity) {
          return Candidate.create(
            e.id,
            starEntity.id,
            starEntity.name,
            e.voteCount,
          );
        }
      })
      .filter((v): v is Candidate => v !== undefined);
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
    const like: string = `%${(keyword ?? '').trim()}%`;
    const candidateWithStarNames: CandidateWithStarName[] = await this.prisma
      .$queryRaw<CandidateWithStarName[]>`
      SELECT
        c.id AS id,
        c.vote_id AS voteId,
        c.star_id AS starId,
        s.name AS starName,
        c.vote_count AS voteCount
    FROM candidate AS c
    JOIN star AS s ON c.star_id = s.id
    WHERE c.vote_id = ${voteId}
    AND s.name LIKE ${like}
    ORDER BY c.vote_count DESC
    `;

    return candidateWithStarNames.map((c) =>
      Candidate.create(c.id, c.starId, c.starName, c.voteCount),
    );
  }
}

interface CandidateWithStarName {
  id: number;
  voteId: number;
  starId: number;
  starName: string;
  voteCount: number;
}
