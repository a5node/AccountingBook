import { Prisma, Accounting, Expenditure, Currency, Income, User } from '@prisma/client';

import { ChannelAccounting, DatabaseType } from '../../types';

export namespace UpdateAccountingCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelAccounting = 'update_accounting';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.AccountingUpdateInput {
    id: Accounting['id'];
    projects?: Prisma.ProjectUpdateManyWithoutAccountingNestedInput | undefined;
    currencies?: Prisma.CurrencyUpdateManyWithoutAccountingNestedInput | undefined;
    expenditure?: Prisma.ExpenditureUpdateManyWithoutAccountingNestedInput | undefined;
    income?: Prisma.IncomeUpdateManyWithoutAccountingNestedInput | undefined;
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
  export const where = ({ id }: Request): Prisma.AccountingFindUniqueArgs['where'] => {
    const payload: Prisma.AccountingFindUniqueArgs['where'] = { id };
    return payload;
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = (data: Omit<Request, 'id'>): Prisma.AccountingUpdateInput => {
    const { projects, expenditure, currencies, income } = data;
    const payload: Prisma.AccountingUpdateInput = {};

    if (projects) payload.projects = projects;
    if (expenditure) payload.expenditure = expenditure;
    if (currencies) payload.currencies = currencies;
    if (income) payload.income = income;

    return payload;
  };
}
