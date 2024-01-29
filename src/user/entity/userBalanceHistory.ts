export class UserBalanceHistory {
  id: number; // auto increment
  userId: number;
  balance: number; // 해당 시점의 잔고
  createdAt: number; // timestamp, 오름차순 정렬되어있음

  constructor(id: number, userId: number, balance: number, createdAt: number) {
    this.id = id;
    this.userId = userId;
    this.balance = balance;
    this.createdAt = createdAt;
  }
}
