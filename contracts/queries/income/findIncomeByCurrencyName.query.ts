import { Prisma, Income, Employee, Accounting, Currency, Project } from '@prisma/client';

import { ChannelIncome } from '../../types';

export namespace FindIncomeByCurrencyNameQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelIncome = 'find_income_by_currency_name';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.IncomeWhereInput {
    currencyName: string | Prisma.StringFilter<'Income'> | undefined;
    value?: Prisma.FloatFilter<'Income'> | undefined;
    isRefund?: boolean | Prisma.BoolFilter<'Income'> | undefined;
    AND?: Prisma.IncomeWhereInput | Prisma.IncomeWhereInput[];
    OR?: Prisma.IncomeWhereInput[] | undefined;
    NOT?: Prisma.IncomeWhereInput | Prisma.IncomeWhereInput[];
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
  }: Request): Prisma.IncomeFindManyArgs['where'] => {
    const payload: Prisma.IncomeFindManyArgs['where'] = { currencyName };

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
