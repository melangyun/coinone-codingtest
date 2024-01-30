export interface GetUserBalanceCommand {
  timestamp: number;
  minBalance: number;
  userIds: string[];
  limit: number;
  offset: number;
}

export interface GetUserBalanceCommandResult {
  count: number;
  rows: GetUserBalanceCommandRow[];
}

export interface GetUserBalanceCommandRow {
  userId: string;
  isAgreed: boolean;
  balance: string;
  createdAt: number;
}
