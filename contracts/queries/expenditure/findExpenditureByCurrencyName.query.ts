import { Prisma, Expenditure, Employee, Accounting, Currency, Project } from '@prisma/client';

import { ChannelExpenditure } from '../../types';

export namespace FindExpenditureByCurrencyNameQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelExpenditure = 'find_expenditure_by_currency_name';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.ExpenditureWhereInput {
    currencyName: string | Prisma.StringFilter<'Expenditure'> | undefined;
    value?: Prisma.FloatFilter<'Expenditure'> | undefined;
    isRefund?: boolean | Prisma.BoolFilter<'Expenditure'> | undefined;
    isIncome?: boolean | Prisma.BoolFilter<'Expenditure'> | undefined;
    AND?: Prisma.ExpenditureWhereInput | Prisma.ExpenditureWhereInput[];
    OR?: Prisma.ExpenditureWhereInput[] | undefined;
    NOT?: Prisma.ExpenditureWhereInput | Prisma.ExpenditureWhereInput[];
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
  }: Request): Prisma.ExpenditureFindManyArgs['where'] => {
    const payload: Prisma.ExpenditureFindManyArgs['where'] = { currencyName };

    if (value) payload.value = value;
    if (AND) payload.AND = AND;
    if (NOT) payload.NOT = NOT;
    if (OR) payload.OR = OR;

    if (typeof isRefund === 'boolean') payload.isRefund = isRefund;

    return payload;
  };
  /*** Filter response to `Client app` */
  export const filter = (data: Database[] | null): Response[] | null => {
    if (!data) return null;
    return data;
  };
}
