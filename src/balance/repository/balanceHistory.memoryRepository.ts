import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { BalanceHistory } from '../entity/BalanceHistory';

const BALANCE_HISTORY_DTOS = (
  JSON.parse(
    '[{"id":1,"userId":"USER_M","balance":"740800","createdAt":1704067200},{"id":2,"userId":"USER_G","balance":"198800","createdAt":1704067200},{"id":3,"userId":"USER_L","balance":"327700","createdAt":1704067200},{"id":4,"userId":"USER_I","balance":"608900","createdAt":1704067201},{"id":5,"userId":"USER_H","balance":"424800","createdAt":1704067201},{"id":6,"userId":"USER_M","balance":"433200","createdAt":1704067201},{"id":7,"userId":"USER_U","balance":"745700","createdAt":1704067202},{"id":8,"userId":"USER_P","balance":"989100","createdAt":1704067202},{"id":9,"userId":"USER_D","balance":"9900","createdAt":1704067202},{"id":10,"userId":"USER_Y","balance":"752800","createdAt":1704067203},{"id":11,"userId":"USER_R","balance":"467400","createdAt":1704067203},{"id":12,"userId":"USER_M","balance":"54900","createdAt":1704067203},{"id":13,"userId":"USER_K","balance":"188300","createdAt":1704067203},{"id":14,"userId":"USER_Z","balance":"936900","createdAt":1704067204},{"id":15,"userId":"USER_N","balance":"973400","createdAt":1704067204},{"id":16,"userId":"USER_R","balance":"764700","createdAt":1704067204},{"id":17,"userId":"USER_W","balance":"304700","createdAt":1704067205},{"id":18,"userId":"USER_E","balance":"454000","createdAt":1704067205},{"id":19,"userId":"USER_M","balance":"214400","createdAt":1704067205},{"id":20,"userId":"USER_V","balance":"780600","createdAt":1704067206},{"id":21,"userId":"USER_C","balance":"309800","createdAt":1704067206},{"id":22,"userId":"USER_R","balance":"300300","createdAt":1704067206},{"id":23,"userId":"USER_I","balance":"632000","createdAt":1704067206},{"id":24,"userId":"USER_J","balance":"711100","createdAt":1704067207},{"id":25,"userId":"USER_T","balance":"97000","createdAt":1704067207},{"id":26,"userId":"USER_G","balance":"892100","createdAt":1704067207},{"id":27,"userId":"USER_I","balance":"158800","createdAt":1704067208},{"id":28,"userId":"USER_M","balance":"480800","createdAt":1704067208},{"id":29,"userId":"USER_P","balance":"147500","createdAt":1704067208},{"id":30,"userId":"USER_P","balance":"303200","createdAt":1704067209},{"id":31,"userId":"USER_I","balance":"683100","createdAt":1704067209},{"id":32,"userId":"USER_Z","balance":"659000","createdAt":1704067209},{"id":33,"userId":"USER_J","balance":"277600","createdAt":1704067209},{"id":34,"userId":"USER_H","balance":"791500","createdAt":1704067210},{"id":35,"userId":"USER_A","balance":"963400","createdAt":1704067210},{"id":36,"userId":"USER_R","balance":"501700","createdAt":1704067210},{"id":37,"userId":"USER_O","balance":"682500","createdAt":1704067211},{"id":38,"userId":"USER_Z","balance":"999100","createdAt":1704067211},{"id":39,"userId":"USER_G","balance":"526000","createdAt":1704067211},{"id":40,"userId":"USER_B","balance":"667800","createdAt":1704067212},{"id":41,"userId":"USER_T","balance":"399500","createdAt":1704067212},{"id":42,"userId":"USER_Y","balance":"429400","createdAt":1704067212},{"id":43,"userId":"USER_R","balance":"646100","createdAt":1704067212},{"id":44,"userId":"USER_V","balance":"49800","createdAt":1704067213},{"id":45,"userId":"USER_O","balance":"778000","createdAt":1704067213},{"id":46,"userId":"USER_K","balance":"807000","createdAt":1704067213},{"id":47,"userId":"USER_R","balance":"113800","createdAt":1704067214},{"id":48,"userId":"USER_D","balance":"934100","createdAt":1704067214},{"id":49,"userId":"USER_A","balance":"533600","createdAt":1704067214},{"id":50,"userId":"USER_P","balance":"706000","createdAt":1704067215},{"id":51,"userId":"USER_K","balance":"125700","createdAt":1704067215},{"id":52,"userId":"USER_N","balance":"745100","createdAt":1704067215},{"id":53,"userId":"USER_X","balance":"491600","createdAt":1704067215},{"id":54,"userId":"USER_Z","balance":"398300","createdAt":1704067216},{"id":55,"userId":"USER_Y","balance":"302100","createdAt":1704067216},{"id":56,"userId":"USER_A","balance":"965000","createdAt":1704067216},{"id":57,"userId":"USER_S","balance":"177700","createdAt":1704067217},{"id":58,"userId":"USER_D","balance":"216500","createdAt":1704067217},{"id":59,"userId":"USER_J","balance":"530100","createdAt":1704067217},{"id":60,"userId":"USER_O","balance":"424100","createdAt":1704067218},{"id":61,"userId":"USER_E","balance":"3600","createdAt":1704067218},{"id":62,"userId":"USER_H","balance":"852800","createdAt":1704067218},{"id":63,"userId":"USER_F","balance":"57600","createdAt":1704067218},{"id":64,"userId":"USER_H","balance":"52800","createdAt":1704067219},{"id":65,"userId":"USER_I","balance":"909900","createdAt":1704067219},{"id":66,"userId":"USER_N","balance":"921800","createdAt":1704067219},{"id":67,"userId":"USER_Z","balance":"25100","createdAt":1704067220},{"id":68,"userId":"USER_M","balance":"357200","createdAt":1704067220},{"id":69,"userId":"USER_I","balance":"981100","createdAt":1704067220},{"id":70,"userId":"USER_K","balance":"805300","createdAt":1704067221},{"id":71,"userId":"USER_N","balance":"407800","createdAt":1704067221},{"id":72,"userId":"USER_E","balance":"335500","createdAt":1704067221},{"id":73,"userId":"USER_X","balance":"728000","createdAt":1704067221},{"id":74,"userId":"USER_F","balance":"264500","createdAt":1704067222},{"id":75,"userId":"USER_L","balance":"166800","createdAt":1704067222},{"id":76,"userId":"USER_A","balance":"286400","createdAt":1704067222},{"id":77,"userId":"USER_Z","balance":"441000","createdAt":1704067223},{"id":78,"userId":"USER_L","balance":"557200","createdAt":1704067223},{"id":79,"userId":"USER_T","balance":"257900","createdAt":1704067223}]',
  ) as BalanceHistory[]
).reverse();

@Injectable()
export class BalanceHistoryMemoryRepository {
  findRecentHistories(
    maxTimestamp: number,
    minBalance: number,
    userIds: string[],
    limit: number,
    offset: number,
  ): BalanceHistory[] {
    if (!userIds.length) {
      return [];
    }

    const userIdSet = new Set(userIds);
    return _.chain(BALANCE_HISTORY_DTOS)
      .filter(
        (balanceHistory) =>
          userIdSet.has(balanceHistory.userId) &&
          balanceHistory.createdAt <= maxTimestamp &&
          parseInt(balanceHistory.balance) >= minBalance,
      )
      .uniqBy('userId')
      .value()
      .slice(offset, offset + limit);
  }

  findRecentHistoriesCount(
    maxTimestamp: number,
    minBalance: number,
    userIds: string[],
  ): number {
    if (!userIds.length) {
      return 0;
    }

    const userIdSet = new Set(userIds);
    return _.chain(BALANCE_HISTORY_DTOS)
      .filter(
        (balanceHistory) =>
          userIdSet.has(balanceHistory.userId) &&
          balanceHistory.createdAt <= maxTimestamp &&
          parseInt(balanceHistory.balance) >= minBalance,
      )
      .uniqBy('userId')
      .size()
      .value();
  }
}
