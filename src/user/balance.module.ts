import { Module } from '@nestjs/common';

import { BalanceService } from './balance.service';
import { BalanceController } from './controller/balance.controller';
import { BalanceHistoryMemoryRepository } from './repository/balanceHistory.memoryRepository';
import { AgreeHistoryMemoryRepository } from './repository/agreeHistory.repository';

const repositories = [
  {
    provide: 'AgreeHistoryRepository',
    useClass: BalanceHistoryMemoryRepository,
  },
  {
    provide: 'BalanceHistoryRepository',
    useClass: AgreeHistoryMemoryRepository,
  },
];

const services = [BalanceService];

@Module({
  imports: [],
  controllers: [BalanceController],
  providers: [...repositories, ...services],
})
export class BalanceModule {}
