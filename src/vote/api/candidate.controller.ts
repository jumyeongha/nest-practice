import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CandidateService } from '../candidate.service';
import { Candidate } from '../domain/candidate';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CandidateListResponse } from './response/candidate.list.response';

@ApiTags('[투표 후보자]')
@Controller('api/votes')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @ApiOperation({
    summary: '투표 후보자 목록 조회',
    description: '투표 ID로 후보자 목록을 조회합니다.',
  })
  @ApiParam({ name: 'voteId', type: Number, description: '투표 ID' })
  @ApiResponse({
    status: 200,
    description: '투표 후보자 목록 조회 성공',
    type: CandidateListResponse,
  })
  @Get(':voteId/candidates')
  async getCandidates(
    @Param('voteId', ParseIntPipe) voteId: number,
  ): Promise<CandidateListResponse> {
    const candidates: Candidate[] =
      await this.candidateService.getCandidates(voteId);
    return CandidateListResponse.from(candidates);
  }

  @ApiOperation({
    summary: '투표 후보자 검색',
    description: '투표 ID와 검색어로 투표 후보자 목록을 검색합니다.',
  })
  @ApiParam({ name: 'voteId', type: Number, description: '투표 ID' })
  @ApiQuery({
    name: 'q',
    required: true,
    type: String,
    description: '검색어',
  })
  @ApiResponse({
    status: 200,
    description: '투표 후보자 목록 검색 성공',
    type: CandidateListResponse,
  })
  @Get(':voteId/candidates/search')
  async search(
    @Param('voteId', ParseIntPipe) voteId: number,
    @Query('q') keyword: string,
  ): Promise<CandidateListResponse> {
    const candidates: Candidate[] = await this.candidateService.search(
      voteId,
      keyword,
    );
    return CandidateListResponse.from(candidates);
  }
}
