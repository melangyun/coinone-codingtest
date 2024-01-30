export class BalanceHistory {
  id: number; // auto increment
  userId: string;
  balance: string; // 해당 시점의 잔고
  createdAt: number; // timestamp, 오름차순 정렬되어있음
}
