import { Inject, Injectable } from '@nestjs/common';
import { AgreeHistoryRepository } from './repository/agreeHistory.memoryRepository';
import { BalanceHistoryMemoryRepository } from './repository/balanceHistory.memoryRepository';

@Injectable()
export class BalanceService {
  constructor(
    @Inject('AgreeHistoryRepository')
    private readonly agreeHistoryRepository: AgreeHistoryRepository,
    @Inject('BalanceHistoryRepository')
    private readonly blanceHistoryRepository: BalanceHistoryMemoryRepository,
  ) {}
}
