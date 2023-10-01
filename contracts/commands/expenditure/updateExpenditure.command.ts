import { Prisma, Expenditure, Accounting, Currency, Employee, Project } from '@prisma/client';

import { ChannelExpenditure } from '../../types';

export namespace UpdateExpenditureCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelExpenditure = 'update_expenditure';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Partial<Expenditure> {
    id: Expenditure['id'];
    description?: string;
    value?: number;
    employeeId?: Employee['id'];
    accountingId?: Accounting['id'];
    currencyName?: Currency['name'];
    projectId?: Project['id'];
    isRefund?: boolean;
    createAt?: Date;
    refundAt?: Date;
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

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = (data: Omit<Request, 'id'>): Prisma.ExpenditureUpdateInput => {
    const { description, value, isRefund, employeeId, accountingId, currencyName, projectId, createAt, refundAt } =
      data;
    const payload: Prisma.ExpenditureUpdateInput = {};

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
