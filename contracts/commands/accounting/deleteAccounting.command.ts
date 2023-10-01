import { Prisma, Accounting } from '@prisma/client';

import { ChannelAccounting } from '../../types';

export namespace DeleteAccountingCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelAccounting = 'delete_accounting';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Accounting, 'id'> {
    id: Accounting['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Accounting {
    id: Accounting['id'];
    createdAt: Date;
    userId: number;
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.AccountingInclude {}

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {};

  /*** Use this function to search the database.*/
  export const where = ({ id }: Request): Prisma.AccountingFindUniqueArgs['where'] => {
    const payload: Prisma.AccountingFindUniqueArgs['where'] = {
      id,
      NOT: [{ id: 1 }],
    };
    return payload;
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Response | null): Response | null => {
    if (!data) return null;
    return data;
  };
}
