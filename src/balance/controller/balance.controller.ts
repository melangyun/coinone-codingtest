import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { BalanceService } from '../service/balance.service';
import { GetAgreementRequestDto } from './dto/GetAgreements.request.dto';
import { GetAgreementsResponseDto } from './dto/GetAgreements.response.dto';

@Controller('/v1')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetAgreementsResponseDto,
  })
  @Get('/user/agreements')
  getAgreements(
    @Query() query: GetAgreementRequestDto,
  ): GetAgreementsResponseDto {
    const result = this.balanceService.getUsersBalance({
      ...query,
      userIds: query.userId,
      minBalance: query.balance,
    });
    return { count: result.count, rows: result.rows };
  }
}
