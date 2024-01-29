import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsString, isString } from 'class-validator';

export class GetAgreementRequestDto {
  @ApiProperty({
    required: false,
    description: '조회 기준 시간, 기본값은 현재 시간입니다.',
    example: 1704067200,
    default: new Date().getTime(),
  })
  timestamp: number = new Date().getTime();

  @ApiProperty({
    required: false,
    description: '조회 기준 잔고(입력 값 이상 유저 조회)',
    example: 3000,
    default: 0,
  })
  @IsInt()
  balance: number = 0;

  @ApiProperty({
    required: false,
    type: 'string',
    default: '전체 유저',
    description: '특정 유저들 id에 대해서만 조회(쉼표로 구분)',
    example: 'USER_A, USER_B, USER_C',
  })
  @Transform(({ value }) => {
    if (!isString(value)) {
      return value;
    }
    return value.split(',').map((v) => v.trim());
  })
  @IsArray()
  @IsString({ each: true })
  userId: string[] = [];

  @ApiProperty({
    required: false,
    description: '조회 내역 수 제한',
    example: 5,
    default: 5,
  })
  @IsInt()
  limit: number = 5;

  @ApiProperty({
    required: false,
    description: '건너 뛸 내역 수 제한',
    example: 5,
    default: 0,
  })
  @IsInt()
  offset: number = 0;
}
