import { Prisma, Currency, User, Accounting } from '@prisma/client';

import { ChannelCurrency } from '../../types';

export namespace AddCurrencyCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelCurrency = 'add_currency';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    name: string;
    shortName: string;
    userId: User['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Currency {
    id: number;
    name: string;
    shortName: string;
    balance: number;
    accountingId: number;
    accounting: Accounting;
  }

  /*** These values return from the database.*/
  export class Database implements Currency {
    id: number;
    name: string;
    shortName: string;
    balance: number;
    accountingId: number;
    accounting: Accounting;
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.CurrencyInclude {
    accounting: boolean;
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    accounting: true,
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ name, shortName, userId }: Request): Prisma.CurrencyCreateInput => {
    const payload: Prisma.CurrencyCreateInput = {
      name,
      shortName,
      accounting: { connect: { userId } },
    };

    return payload;
  };
}
