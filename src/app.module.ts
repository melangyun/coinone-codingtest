import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [BalanceModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
