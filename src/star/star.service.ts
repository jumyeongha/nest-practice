import { StarRepository } from './star.repository';
import { StarCreateRequest } from './dto/star.create.request';
import { StarResponse } from './dto/star.response';
import { StarEntity } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { StarListResponse } from './dto/star.list.response';

@Injectable()
export class StarService {
  constructor(private readonly starRepository: StarRepository) {}

  async register(request: StarCreateRequest): Promise<StarResponse> {
    const star: StarEntity = await this.starRepository.save(request.name);
    return StarResponse.from(star);
  }

  async getStars(): Promise<StarListResponse> {
    const stars: StarEntity[] = await this.starRepository.findMany();
    return StarListResponse.from(stars);
  }
}
