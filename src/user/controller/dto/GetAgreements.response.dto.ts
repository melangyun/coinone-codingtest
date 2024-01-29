import { ApiProperty } from '@nestjs/swagger';

export class GetAgreementsResponseDto {
  @ApiProperty({
    description: '조회된 전체 유저 수',
  })
  count: number;

  @ApiProperty({
    type: () => [GetAgreementsResponseRow],
  })
  rows: GetAgreementsResponseRow[];
}

export class GetAgreementsResponseRow {
  @ApiProperty({
    description: '유저 id',
  })
  userId: number;

  @ApiProperty({
    description: '동의 여부',
  })
  isAgreed: boolean;

  @ApiProperty({
    description: '해당 시간 유저의 잔고',
  })
  balance: string;

  @ApiProperty({
    description: '유저의 약관 동의/비동의 시간',
  })
  createdAt: string;
}
