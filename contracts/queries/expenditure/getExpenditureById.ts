import { Prisma, Expenditure, Accounting, Employee, Currency, Project } from '@prisma/client';

import { ChannelExpenditure } from '../../types';

export namespace GetExpenditureByIdQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelExpenditure = 'get_expenditure_by_id';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Prisma.ExpenditureWhereUniqueInput, 'id'> {
    id: Expenditure['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Expenditure {
    id: Expenditure['id'];
    value: number;
    description: string | null;
    refundAt: Date | null;
    isRefund: boolean;
    createAt: Date;

    currency: Currency;
    accounting: Accounting;
    project?: Project | null;
    employee?: Employee | null;
    accountingId: Accounting['id'];
    currencyName: Currency['name'];
    projectId: Project['id'] | null;
    employeeId: Employee['id'] | null;
  }

  /*** These values return from the database.*/
  export class Database implements Expenditure {
    id: Expenditure['id'];
    value: number;
    description: string | null;
    refundAt: Date | null;
    isRefund: boolean;
    createAt: Date;

    currency: Currency;
    accounting: Accounting;
    project?: Project | null;
    employee?: Employee | null;
    accountingId: Accounting['id'];
    currencyName: Currency['name'];
    projectId: Project['id'] | null;
    employeeId: Employee['id'] | null;
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.ExpenditureInclude {
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
  export const where = ({ id }: Request): Prisma.ExpenditureFindUniqueArgs['where'] => {
    const payload: Prisma.ExpenditureFindUniqueArgs['where'] = { id };
    return payload;
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };
}
