import { Vote } from '../domain/vote';
import { PrismaService } from '../../infra/db/prisma/prisma.service';
import { VoteEntity } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { toVoteStatus, VoteStatus } from '../domain/vote.status';
import { PageResult } from '../../common/page.result';

@Injectable()
export class VoteRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: number): Promise<Vote | null> {
    const voteEntity: VoteEntity | null =
      await this.prisma.voteEntity.findUnique({
        where: { id: id },
      });

    if (!voteEntity) {
      return null;
    }

    return Vote.create(
      voteEntity.id,
      voteEntity.title,
      voteEntity.startedAt,
      voteEntity.endedAt,
      toVoteStatus(voteEntity.status),
    );
  }

  async findManyBy(
    page: number,
    size: number,
    status: VoteStatus,
  ): Promise<PageResult<Vote>> {
    const where = {
      status: status,
    };
    const voteEntities: VoteEntity[] = await this.prisma.voteEntity.findMany({
      where: where,
      skip: (page - 1) * size,
      take: size,
      orderBy: {
        endedAt: 'asc',
      },
    });

    const total: number = await this.prisma.voteEntity.count({
      where: where,
    });

    const votes: Vote[] = voteEntities.map((e) =>
      Vote.create(
        e.id,
        e.title,
        e.startedAt,
        e.endedAt,
        toVoteStatus(e.status),
      ),
    );

    return PageResult.of<Vote>(votes, page, size, total);
  }
}
