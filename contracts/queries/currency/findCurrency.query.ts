import { Prisma, Accounting, Currency, Expenditure, Income } from '@prisma/client';

import { ChannelCurrency, DatabaseType } from '../../types';

export namespace FindCurrencyQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelCurrency = 'find_currency';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.CurrencyWhereInput {
    shortName: string;
    AND?: Prisma.CurrencyWhereInput | Prisma.CurrencyWhereInput[];
    NOT?: Prisma.CurrencyWhereInput | Prisma.CurrencyWhereInput[];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Currency {
    id: Currency['id'];
    name: string;
    shortName: string;
    balance: number;
    accountingId: number;
    accounting: Accounting;
    expenditure: Expenditure[];
    income: Income[];
    projects: DatabaseType.ProjectType[];
  }

  /*** These values return from the database.*/
  export class Database implements Response {
    id: Currency['id'];
    name: string;
    shortName: string;
    balance: number;
    accountingId: number;
    accounting: Accounting;
    expenditure: Expenditure[];
    projects: DatabaseType.ProjectType[];
    income: Income[];
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.CurrencyInclude {
    accounting: boolean;
    expenditure: boolean;
    income: boolean;
    projects: {
      include: {
        workers: boolean;
      };
    };
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    accounting: true,
    expenditure: true,
    income: true,
    projects: {
      include: {
        workers: true,
      },
    },
  };

  /*** Use this function to search the database.*/
  export const where = ({ shortName, AND, NOT }: Request): Prisma.CurrencyFindUniqueArgs['where'] => {
    const payload: Prisma.CurrencyFindUniqueArgs['where'] = { shortName };
    if (AND) payload.AND = AND;
    if (NOT) payload.NOT = NOT;

    return payload;
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };
}
