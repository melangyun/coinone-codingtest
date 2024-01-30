import { Injectable } from '@nestjs/common';

import { BalanceHistoryMemoryRepository } from '../repository/balanceHistory.memoryRepository';
import { AgreeHistoryMemoryRepository } from '../repository/agreeHistory.memoryRepository';
import {
  GetUserBalanceCommand,
  GetUserBalanceCommandResult,
} from './command/getUsersBalance.command';
import { BalanceHistory } from '../entity/BalanceHistory';
import { AgreeHistory } from '../entity/AgreeHistory';

@Injectable()
export class BalanceService {
  constructor(
    private readonly agreeHistoryRepository: AgreeHistoryMemoryRepository,
    private readonly balanceHistoryRepository: BalanceHistoryMemoryRepository,
  ) {}

  public getUsersBalance(
    command: GetUserBalanceCommand,
  ): GetUserBalanceCommandResult {
    const agreeHistories =
      this.agreeHistoryRepository.findRecentAgreedHistories(
        command.timestamp,
        command.userIds,
      );
    const agreedUserIdToHistories: Map<string, AgreeHistory> = new Map(
      agreeHistories.map((agreeHistory) => [agreeHistory.userId, agreeHistory]),
    );
    const agreedUserIds = [...agreedUserIdToHistories.keys()];

    const count = this.balanceHistoryRepository.findRecentHistoriesCount(
      command.timestamp,
      command.minBalance,
      agreedUserIds,
    );
    const balanceHistories: BalanceHistory[] =
      this.balanceHistoryRepository.findRecentHistories(
        command.timestamp,
        command.minBalance,
        agreedUserIds,
        command.limit,
        command.offset,
      );

    return {
      count,
      rows: balanceHistories.map((balanceHistory) => ({
        userId: balanceHistory.userId,
        isAgreed: true,
        balance: balanceHistory.balance,
        createdAt: agreedUserIdToHistories.get(balanceHistory.userId).createdAt,
      })),
    };
  }
}
