import { PrismaService } from '../infra/db/prisma/prisma.service';
import { StarEntity } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StarRepository {
  constructor(private readonly prisma: PrismaService) {}

  save(name: string): Promise<StarEntity> {
    return this.prisma.starEntity.create({
      data: {
        name: name,
      },
    });
  }

  findMany(): Promise<StarEntity[]> {
    return this.prisma.starEntity.findMany();
  }

  findManyByIds(ids: number[]): Promise<StarEntity[]> {
    return this.prisma.starEntity.findMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
