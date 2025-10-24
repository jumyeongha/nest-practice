import { Controller, Get, Res } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import type { Response } from 'express';

@Controller('metrics')
export class PrometheusController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @Get()
  async getMetrics(@Res() res: Response): Promise<void> {
    const metrics = await this.prometheusService.getMetrics();
    res.setHeader('Content-Type:', 'text/plain');
    res.send(metrics);
  }
}
