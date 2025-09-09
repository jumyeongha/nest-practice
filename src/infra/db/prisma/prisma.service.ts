import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { format } from 'sql-formatter';

@Injectable()
export class PrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error'
  >
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'info', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
        { level: 'error', emit: 'stdout' },
      ],
    });

    // 개발 환경에서만 상세 로그
    if (process.env.NODE_ENV !== 'production') {
      this.$on('query', (e) => {
        const pretty = format(e.query, { language: 'mysql' });
        let params: unknown;
        try {
          params = JSON.parse(e.params);
        } catch {
          params = e.params;
        }

        this.logger.log(
          `[Prisma][${e.duration}ms]\n` +
            `SQL\n${pretty}\n` +
            `Params\n${JSON.stringify(params, null, 2)}`,
        );
      });
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
