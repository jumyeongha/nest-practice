import { Body, Controller, Get, Post } from '@nestjs/common';
import { StarService } from './star.service';
import { StarCreateRequest } from './dto/star.create.request';
import { StarResponse } from './dto/star.response';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StarListResponse } from './dto/star.list.response';

@ApiTags('[스타]')
@Controller('api/stars')
export class StarController {
  constructor(private readonly starService: StarService) {}

  @ApiOperation({
    summary: '스타 등록',
    description: '스타를 등록합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '스타 등록 성공',
    type: StarResponse,
  })
  @Post()
  register(@Body() request: StarCreateRequest): Promise<StarResponse> {
    return this.starService.register(request);
  }

  @ApiOperation({
    summary: '스타 목록 조회',
    description: '스타 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '스타 목록 조회 성공',
    type: StarListResponse,
  })
  @Get()
  getStars(): Promise<StarListResponse> {
    return this.starService.getStars();
  }
}
