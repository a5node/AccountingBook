import { Prisma, Income, Accounting, Currency, Employee, Project } from '@prisma/client';

import { ChannelIncome } from '../../types';

export namespace AddIncomeCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelIncome = 'add_income';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Omit<Prisma.IncomeCreateInput, 'accounting' | 'currency' | 'employee'> {
    description: string | null | undefined;
    value: number;
    accountingId: Accounting['id'];
    currencyId: Currency['id'];

    employeeId?: Employee['id'];
    projectId?: Project['id'];
    createAt?: Date;
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

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({
    description,
    value,
    employeeId,
    accountingId,
    currencyId,
    projectId,
    createAt,
  }: Request): Prisma.IncomeCreateInput => {
    const payload: Prisma.IncomeCreateInput = {
      accounting: { connect: { id: accountingId } },
      currency: { connect: { id: currencyId } },
      description,
      value: Number(value),
    };

    if (projectId) payload.project = { connect: { id: projectId } };
    if (employeeId) payload.employee = { connect: { id: employeeId } };
    if (createAt) payload.createAt = new Date(createAt);

    return payload;
  };
}
