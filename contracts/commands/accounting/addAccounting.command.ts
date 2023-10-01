import { Prisma, User, Accounting } from '@prisma/client';

import { ChannelAccounting } from '../../types';

export namespace AddAccountingCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelAccounting = 'add_accounting';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Accounting, 'userId'> {
    userId: User['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Accounting {
    id: Accounting['id'];
    createdAt: Date;
    userId: number;
  }

  /*** These values return from the database.*/
  export class Database implements Accounting {
    id: Accounting['id'];
    createdAt: Date;
    userId: number;
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.AccountingInclude {}

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {};

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ userId }: Request): Prisma.AccountingCreateInput => {
    const payload: Prisma.AccountingCreateInput = {
      user: { connect: { id: userId } },
    };

    return payload;
  };
}
