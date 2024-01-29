import { Controller, Get, Query } from '@nestjs/common';

import { BalanceService } from '../balance.service';
import { GetAgreementRequestDto } from './dto/GetAgreements.request.dto';
import { GetAgreementsResponseDto } from './dto/GetAgreements.response.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/v1')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetAgreementsResponseDto,
  })
  @Get('/user/agreements')
  async getAgreements(
    @Query() query: GetAgreementRequestDto,
  ): Promise<GetAgreementsResponseDto> {
    console.log(query);

    return null;
  }
}
