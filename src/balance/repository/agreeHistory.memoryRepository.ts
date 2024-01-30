import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';

import { AgreeHistory } from '../entity/AgreeHistory';

const AGREE_HISTORY_DTOS = (
  JSON.parse(
    '[{"id":1,"userId":"USER_G","isAgree":true,"createdAt":1704067200},{"id":2,"userId":"USER_I","isAgree":false,"createdAt":1704067201},{"id":3,"userId":"USER_C","isAgree":true,"createdAt":1704067202},{"id":4,"userId":"USER_C","isAgree":false,"createdAt":1704067203},{"id":5,"userId":"USER_F","isAgree":true,"createdAt":1704067204},{"id":6,"userId":"USER_K","isAgree":true,"createdAt":1704067205},{"id":7,"userId":"USER_C","isAgree":true,"createdAt":1704067206},{"id":8,"userId":"USER_F","isAgree":false,"createdAt":1704067207},{"id":9,"userId":"USER_B","isAgree":true,"createdAt":1704067208},{"id":10,"userId":"USER_D","isAgree":true,"createdAt":1704067209},{"id":11,"userId":"USER_D","isAgree":false,"createdAt":1704067210},{"id":12,"userId":"USER_J","isAgree":true,"createdAt":1704067211},{"id":13,"userId":"USER_J","isAgree":false,"createdAt":1704067212},{"id":14,"userId":"USER_I","isAgree":true,"createdAt":1704067213},{"id":15,"userId":"USER_D","isAgree":true,"createdAt":1704067214},{"id":16,"userId":"USER_A","isAgree":true,"createdAt":1704067215},{"id":17,"userId":"USER_D","isAgree":false,"createdAt":1704067216},{"id":18,"userId":"USER_B","isAgree":false,"createdAt":1704067217},{"id":19,"userId":"USER_F","isAgree":true,"createdAt":1704067218},{"id":20,"userId":"USER_E","isAgree":true,"createdAt":1704067219},{"id":21,"userId":"USER_E","isAgree":false,"createdAt":1704067220},{"id":22,"userId":"USER_F","isAgree":false,"createdAt":1704067221},{"id":23,"userId":"USER_D","isAgree":true,"createdAt":1704067222},{"id":24,"userId":"USER_F","isAgree":true,"createdAt":1704067223}]',
  ) as AgreeHistory[]
).reverse();

@Injectable()
export class AgreeHistoryMemoryRepository {
  findRecentAgreedHistories(
    maxTimestamp: number,
    userIds: string[],
  ): AgreeHistory[] {
    if (!userIds.length) {
      return this.findRecentAgreedData(maxTimestamp);
    }
    return this.findRecentAgreedDataByUsers(maxTimestamp, userIds);
  }

  private findRecentAgreedData(maxTimestamp: number): AgreeHistory[] {
    return _.chain(AGREE_HISTORY_DTOS)
      .filter((agreeHistory) => agreeHistory.createdAt <= maxTimestamp)
      .uniqBy('userId')
      .filter((agreeHistory) => agreeHistory.isAgree)
      .value();
  }

  private findRecentAgreedDataByUsers(maxTimestamp: number, userIds: string[]) {
    const userIdSet = new Set(userIds);
    return _.chain(AGREE_HISTORY_DTOS)
      .filter(
        (agreeHistory) =>
          agreeHistory.createdAt <= maxTimestamp &&
          userIdSet.has(agreeHistory.userId),
      )
      .uniqBy('userId')
      .filter((agreeHistory) => agreeHistory.isAgree)
      .value();
  }
}
