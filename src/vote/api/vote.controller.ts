import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { VoteService } from '../vote.service';
import { VoteResponse } from './vote.response';
import { Vote } from '../vote';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { VoteListRequest } from './vote.list.request';
import { PageResult } from '../../common/page.result';
import { PageResponse } from '../../common/page.response';

@ApiTags('[투표]')
@Controller('/api/votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @ApiOperation({
    summary: '투표 상세 조회',
    description: '특정 투표를 ID로 조회합니다.',
  })
  @ApiParam({ name: 'id', type: Number, description: '투표 ID' })
  @ApiResponse({
    status: 200,
    description: '투표 조회 성공',
    type: VoteResponse,
  })
  @Get(':id')
  async getVote(@Param('id', ParseIntPipe) id: number): Promise<VoteResponse> {
    const vote: Vote = await this.voteService.getVote(id);
    return VoteResponse.from(vote);
  }

  @ApiExtraModels(PageResponse, VoteResponse)
  @ApiOperation({
    summary: '투표 목록 조회',
    description: '투표 목륵을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '투표 목록 조회 성공',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PageResponse) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(VoteResponse) }, // ← 아이템 타입 지정
            },
          },
        },
      ],
    },
  })
  @Get()
  async getVotes(
    @Query() request: VoteListRequest,
  ): Promise<PageResponse<VoteResponse>> {
    const votes: PageResult<Vote> = await this.voteService.getVotes(
      request.page,
      request.size,
      request.status,
    );
    return PageResponse.convert<Vote, VoteResponse>(votes, (v) =>
      VoteResponse.from(v),
    );
  }
}
