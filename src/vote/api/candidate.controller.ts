import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CandidateService } from '../candidate.service';
import { Candidate } from '../candidate';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CandidateListResponse } from './candidate.list.response';

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
