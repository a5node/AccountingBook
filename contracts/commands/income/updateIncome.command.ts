import { Prisma, Income, Accounting, Currency, Employee, Project } from '@prisma/client';

import { ChannelIncome } from '../../types';

export namespace UpdateIncomeCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelIncome = 'update_income';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Partial<Income> {
    id: Income['id'];

    value?: number;
    description?: string;
    isRefund?: boolean;
    createAt?: Date;
    refundAt?: Date;

    employeeId?: Employee['id'];
    accountingId?: Accounting['id'];
    currencyName?: Currency['name'];
    projectId?: Project['id'];
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
    project?: Project | null;
    employee?: Employee | null;
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
    project?: Project | null;
    employee?: Employee | null;
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

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = (data: Omit<Request, 'id'>): Prisma.IncomeUpdateInput => {
    const { description, value, isRefund, employeeId, accountingId, currencyName, projectId, createAt, refundAt } =
      data;
    const payload: Prisma.IncomeUpdateInput = {};

    if (description) payload.description = description;
    if (value) payload.value = Number(value);
    if (accountingId) payload.accounting = { connect: { id: accountingId } };
    if (currencyName) payload.currency = { connect: { name: currencyName } };
    if (projectId) payload.project = { connect: { id: projectId } };
    if (employeeId) payload.employee = { connect: { id: employeeId } };

    if (createAt) payload.createAt = new Date(createAt);
    if (refundAt) payload.refundAt = new Date(refundAt);

    if (typeof isRefund === 'boolean') {
      payload.isRefund = isRefund;
      if (isRefund && !refundAt) payload.refundAt = new Date();
    }

    return payload;
  };
}
