import { Module } from '@nestjs/common';

import { BalanceService } from './service/balance.service';
import { BalanceController } from './controller/balance.controller';
import { BalanceHistoryMemoryRepository } from './repository/balanceHistory.memoryRepository';
import { AgreeHistoryMemoryRepository } from './repository/agreeHistory.memoryRepository';

const repositories = [
  BalanceHistoryMemoryRepository,
  AgreeHistoryMemoryRepository,
];

const services = [BalanceService];

@Module({
  imports: [],
  controllers: [BalanceController],
  providers: [...repositories, ...services],
})
export class BalanceModule {}
