import { Prisma, Income, Employee, Accounting, Currency, Project } from '@prisma/client';

import { ChannelIncome } from '../../types';

export namespace FindIncomesQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelIncome = 'find_incomes';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.IncomeWhereInput {
    value?: Prisma.FloatFilter<'Income'> | undefined;
    isRefund?: boolean | Prisma.BoolFilter<'Income'> | undefined;
    currencyName?: string | Prisma.StringFilter<'Income'> | undefined;
    AND?: Prisma.IncomeWhereInput | Prisma.IncomeWhereInput[];
    OR?: Prisma.IncomeWhereInput[] | undefined;
    NOT?: Prisma.IncomeWhereInput | Prisma.IncomeWhereInput[];
    createAt?: Prisma.DateTimeFilter<'Income'>;
    accounting?:
      | (Prisma.Without<Prisma.AccountingRelationFilter, Prisma.AccountingWhereInput> & Prisma.AccountingWhereInput)
      | (Prisma.Without<Prisma.AccountingWhereInput, Prisma.AccountingRelationFilter> & Prisma.AccountingRelationFilter)
      | undefined;
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
  export const where = ({
    value,
    isRefund,
    currencyName,
    AND,
    NOT,
    OR,
    accounting,
    createAt,
  }: Request): Prisma.IncomeFindManyArgs['where'] => {
    const payload: Prisma.IncomeFindManyArgs['where'] = { currencyName };

    if (value) payload.value = value;
    if (typeof isRefund === 'boolean') payload.isRefund = isRefund;
    if (AND) payload.AND = AND;
    if (NOT) payload.NOT = NOT;
    if (OR) payload.OR = OR;
    if (accounting) payload.accounting = accounting;
    if (createAt) payload.createAt = createAt;
    return payload;
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database[] | null): Response[] | null => {
    if (!data) return null;
    return data;
  };
}
