import { Prisma, Income, Accounting, Currency, Employee, Project } from '@prisma/client';

import { ChannelIncome } from '../../types';

export namespace DeleteIncomeCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelIncome = 'delete_income';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Income, 'id'> {
    id: Income['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Income {
    id: Income['id'];
    description: string | null;
    value: number;
    isRefund: boolean;
    createAt: Date;
    refundAt: Date | null;

    projectId: Project['id'] | null;
    employeeId: Employee['id'] | null;
    accountingId: Accounting['id'];
    currencyName: Currency['name'];
    currency: Currency;
    accounting: Accounting;
  }

  /*** These values return from the database.*/
  export class Database implements Income {
    id: Income['id'];
    description: string | null;
    value: number;
    isRefund: boolean;
    createAt: Date;
    refundAt: Date | null;

    projectId: Project['id'] | null;
    employeeId: Employee['id'] | null;
    accountingId: Accounting['id'];
    currencyName: Currency['name'];
    currency: Currency;
    accounting: Accounting;
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.IncomeInclude {
    accounting: boolean;
    currency: boolean;
    employee: boolean;
    project: boolean;
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    accounting: true,
    currency: true,
    employee: true,
    project: true,
  };

  /*** Use this function to search the database.*/
  export const where = ({ id }: Request): Prisma.IncomeFindUniqueArgs['where'] => {
    const payload: Prisma.IncomeFindUniqueArgs['where'] = { id };
    return payload;
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;

    return data;
  };
}
