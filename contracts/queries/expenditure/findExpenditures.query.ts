import { Prisma, Expenditure, Employee, Accounting, Currency, Project } from '@prisma/client';

import { ChannelExpenditure } from '../../types';

export namespace FindExpendituresQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelExpenditure = 'find_expenditures';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.ExpenditureWhereInput {
    value?: Prisma.FloatFilter<'Expenditure'> | undefined;
    isRefund?: boolean | Prisma.BoolFilter<'Expenditure'> | undefined;
    isIncome?: boolean | Prisma.BoolFilter<'Expenditure'> | undefined;
    currencyName?: string | Prisma.StringFilter<'Expenditure'> | undefined;
    AND?: Prisma.ExpenditureWhereInput | Prisma.ExpenditureWhereInput[];
    OR?: Prisma.ExpenditureWhereInput[] | undefined;
    NOT?: Prisma.ExpenditureWhereInput | Prisma.ExpenditureWhereInput[];
    createAt?: Prisma.DateTimeFilter<'Expenditure'>;
    accounting?:
      | (Prisma.Without<Prisma.AccountingRelationFilter, Prisma.AccountingWhereInput> & Prisma.AccountingWhereInput)
      | (Prisma.Without<Prisma.AccountingWhereInput, Prisma.AccountingRelationFilter> & Prisma.AccountingRelationFilter)
      | undefined;
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
  export const where = ({
    value,
    isRefund,
    currencyName,
    AND,
    NOT,
    OR,
    createAt,
    accounting,
  }: Request): Prisma.ExpenditureFindManyArgs['where'] => {
    const payload: Prisma.ExpenditureFindManyArgs['where'] = { currencyName };

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
