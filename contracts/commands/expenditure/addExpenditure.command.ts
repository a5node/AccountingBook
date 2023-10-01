import { Prisma, Expenditure, Accounting, Currency, Employee, Project } from '@prisma/client';

import { ChannelExpenditure } from '../../types';

export namespace AddExpenditureCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelExpenditure = 'add_expenditure';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Omit<Prisma.ExpenditureCreateInput, 'accounting' | 'currency' | 'employee'> {
    description: string | null | undefined;
    value: number;
    employeeId?: Employee['id'];
    accountingId: Accounting['id'];
    currencyId: Currency['id'];
    projectId?: Project['id'];
    createAt?: Date;
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
    accountingId: Accounting['id'];
    currencyName: Currency['name'];
    projectId: Project['id'] | null;
    employeeId: Employee['id'] | null;
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.ExpenditureInclude {
    accounting: boolean;
    currency: boolean;
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    accounting: true,
    currency: true,
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
  }: Request): Prisma.ExpenditureCreateInput => {
    const payload: Prisma.ExpenditureCreateInput = {
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
