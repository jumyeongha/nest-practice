import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { VotingLogService } from '../voting.log.service';
import { VotingLogCreateRequest } from './request/voting.log.create.request';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('[투표 기록]')
@Controller('api')
export class VotingLogController {
  constructor(private readonly votingLogService: VotingLogService) {}

  @ApiOperation({
    summary: '투표 하기',
    description: '투표를 진행합니다.',
  })
  @ApiParam({
    name: 'voteId',
    type: Number,
    description: '투표 ID',
    required: true,
    example: 1,
  })
  @ApiParam({
    name: 'candidateId',
    type: Number,
    description: '후보자 ID',
    required: true,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: '투표 성공',
  })
  @Post('votes/:voteId/candidates/:candidateId/voting-log')
  async vote(
    @Param('voteId', ParseIntPipe) voteId: number,
    @Param('candidateId', ParseIntPipe) candidateId: number,
    @Body() request: VotingLogCreateRequest,
  ): Promise<void> {
    await this.votingLogService.vote(request.userId, voteId, candidateId);
  }
}
