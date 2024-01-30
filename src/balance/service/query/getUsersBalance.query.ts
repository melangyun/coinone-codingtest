export interface GetUserBalanceQuery {
  timestamp: number;
  minBalance: number;
  userIds: string[];
  limit: number;
  offset: number;
}

export interface GetUserBalanceQueryResult {
  count: number;
  rows: GetUserBalanceQueryRow[];
}

export interface GetUserBalanceQueryRow {
  userId: string;
  isAgreed: boolean;
  balance: string;
  createdAt: number;
}
