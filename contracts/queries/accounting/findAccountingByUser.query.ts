import { Prisma, Accounting, User, Currency, Expenditure, Income } from '@prisma/client';

import { ChannelAccounting, DatabaseType } from '../../types';

export namespace FindAccountingByUserQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelAccounting = 'find_accounting_by_user';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.AccountingWhereInput {
    userId: User['id'];
    AND?: Prisma.AccountingWhereInput | Prisma.AccountingWhereInput[];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Accounting {
    id: Accounting['id'];
    userId: User['id'];
    createdAt: Date;
    currencies: Currency[];
    expenditure: Expenditure[];
    projects: DatabaseType.ProjectType[];
    income: Income[];
  }

  /*** These values return from the database.*/
  export class Database implements Response {
    id: Accounting['id'];
    userId: User['id'];
    createdAt: Date;
    currencies: Currency[];
    expenditure: Expenditure[];
    projects: DatabaseType.ProjectType[];
    income: Income[];
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.AccountingInclude {
    currencies: boolean;
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
    currencies: true,
    expenditure: true,
    projects: {
      include: { workers: true },
    },
    income: true,
  };

  /*** Use this function to search the database.*/
  export const where = ({ userId, AND }: Request): Prisma.AccountingFindUniqueArgs['where'] => {
    const payload: Prisma.AccountingFindUniqueArgs['where'] = { userId };

    if (AND) payload.AND = AND;

    return payload;
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };
}
