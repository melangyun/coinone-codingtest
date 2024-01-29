import { Controller, Get, Query } from '@nestjs/common';

import { UserService } from '../user.service';
import { GetAgreementRequestDto } from './dto/GetAgreement.request.dto';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/agreements')
  async getAgreements(@Query() query: GetAgreementRequestDto){
    console.log(query);
    
    return null;
  }
}
