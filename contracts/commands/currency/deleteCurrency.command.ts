import { Prisma, Currency } from '@prisma/client';

import { ChannelCurrency } from '../../types';

export namespace DeleteCurrencyCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelCurrency = 'delete_currency';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Currency, 'id'> {
    id: Currency['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Currency {
    id: number;
    name: string;
    shortName: string;
    balance: number;
    accountingId: number;
  }

  /*** These values return from the database.*/
  export class Database implements Currency {
    id: number;
    name: string;
    shortName: string;
    balance: number;
    accountingId: number;
  }
  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.CurrencyInclude {}

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {};

  /*** Use this function to search the database.*/
  export const where = ({ id }: Request): Prisma.CurrencyFindUniqueArgs['where'] => {
    const payload: Prisma.CurrencyFindUniqueArgs['where'] = { id };
    return payload;
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };
}
