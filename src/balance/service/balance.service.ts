import { Injectable } from '@nestjs/common';

import { BalanceHistoryMemoryRepository } from '../repository/balanceHistory.memoryRepository';
import { AgreeHistoryMemoryRepository } from '../repository/agreeHistory.memoryRepository';
import {
  GetUserBalanceQuery,
  GetUserBalanceQueryResult,
} from './query/getUsersBalance.query';
import { BalanceHistory } from '../entity/BalanceHistory';
import { AgreeHistory } from '../entity/AgreeHistory';

@Injectable()
export class BalanceService {
  constructor(
    private readonly agreeHistoryRepository: AgreeHistoryMemoryRepository,
    private readonly balanceHistoryRepository: BalanceHistoryMemoryRepository,
  ) {}

  public getUsersBalance(
    query: GetUserBalanceQuery,
  ): GetUserBalanceQueryResult {
    const agreeHistories =
      this.agreeHistoryRepository.findRecentAgreedHistories(
        query.timestamp,
        query.userIds,
      );
    const agreedUserIdToHistories: Map<string, AgreeHistory> = new Map(
      agreeHistories.map((agreeHistory) => [agreeHistory.userId, agreeHistory]),
    );
    const agreedUserIds = [...agreedUserIdToHistories.keys()];

    const count = this.balanceHistoryRepository.findRecentHistoriesCount(
      query.timestamp,
      query.minBalance,
      agreedUserIds,
    );
    const balanceHistories: BalanceHistory[] =
      this.balanceHistoryRepository.findRecentHistories(
        query.timestamp,
        query.minBalance,
        agreedUserIds,
        query.limit,
        query.offset,
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
