import { Prisma, Currency, Accounting, Expenditure, Income } from '@prisma/client';

import { ChannelCurrency, DatabaseType } from '../../types';

export namespace UpdateCurrencyCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelCurrency = 'update_currency';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Partial<Omit<Currency, 'accountingId'>> {
    id: Currency['id'];
    name?: string;
    shortName?: string;
    balance?: number;
    expenditure?: Prisma.ExpenditureUpdateManyWithoutCurrencyNestedInput;
    projects?: Prisma.ProjectUpdateManyWithoutCurrenciesNestedInput;
    income?: Prisma.IncomeUpdateManyWithoutCurrencyNestedInput;
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
  export const where = ({ id }: Request): Prisma.CurrencyFindUniqueArgs['where'] => {
    const payload: Prisma.CurrencyFindUniqueArgs['where'] = { id };
    return payload;
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = (data: Omit<Request, 'id'>): Prisma.CurrencyUpdateInput => {
    const { name, shortName, balance, expenditure, projects, income } = data;
    const payload: Prisma.CurrencyUpdateInput = {};

    if (name) payload.name = name;
    if (shortName) payload.shortName = shortName;
    if (balance) payload.balance = Number(balance);
    if (expenditure) payload.expenditure = expenditure;
    if (projects) payload.projects = projects;
    if (income) payload.income = income;

    return payload;
  };
}
