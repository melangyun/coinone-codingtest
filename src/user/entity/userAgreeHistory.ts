export class UserAgreeHistory {
  id: number; // auto increment
  userId: number;
  isAgree: boolean;
  createdAt: number; // timestamp, 오름차순 정렬되어있음

  constructor(id: number, userId: number, isAgree: boolean, createdAt: number) {
    this.id = id;
    this.userId = userId;
    this.isAgree = isAgree;
    this.createdAt = createdAt;
  }
}
