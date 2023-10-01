import { Work, Prisma, Project, Currency, Expenditure, Income } from '@prisma/client';

import { ChannelProject } from '../../types';

export namespace UpdateProjectCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelProject = 'update_project';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Partial<Project> {
    id: Project['id'];
    currencyId?: Currency['id'];
    price?: number;
    hours?: number;
    name?: string;
    customer?: string;
    link?: string | null;
    repositoryUrl?: string | null;
    isEnd?: boolean;
    isStart?: boolean;
    start?: Date | null;
    end?: Date | null;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Project {
    id: Project['id'];
    price: number;
    hours: number;
    name: string;
    customer: string;
    link: string | null;
    repositoryUrl: string | null;
    isEnd: boolean;
    isStart: boolean;
    createAt: Date;
    start: Date | null;
    end: Date | null;
    workers: Work[];
    currencies: Currency[];
    expenditure: Expenditure[];
    income: Income[];
  }

  /*** These values return from the database.*/
  export class Database implements Response {
    id: Project['id'];
    price: number;
    hours: number;
    name: string;
    customer: string;
    link: string | null;
    repositoryUrl: string | null;
    isEnd: boolean;
    isStart: boolean;
    createAt: Date;
    start: Date | null;
    end: Date | null;
    workers: Work[];
    currencies: Currency[];
    expenditure: Expenditure[];
    income: Income[];
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.ProjectInclude {
    workers: boolean;
    currencies: boolean;
    accounting: boolean;
    expenditure: boolean;
    income: boolean;
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    workers: true,
    currencies: true,
    accounting: true,
    expenditure: true,
    income: true,
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = (find: Project, data: Omit<Request, 'id' | 'currencyId'>): Prisma.ProjectUpdateInput => {
    const { name, price, hours, customer, link, repositoryUrl, isEnd, isStart, start, end } = data;
    const payload: Prisma.ProjectUpdateInput = {};

    if (name) payload.name = name;
    if (price) payload.price = find.price + Number(price);
    if (hours) payload.hours = find.hours + Number(hours);
    if (customer) payload.customer = customer;
    if (link) payload.link = link;
    if (repositoryUrl) payload.repositoryUrl = repositoryUrl;
    if (typeof isEnd === 'boolean') {
      payload.isEnd = isEnd;
      payload.isStart = false;
      if (isEnd === true) payload.end = new Date();
    }
    if (typeof isStart === 'boolean') {
      payload.isStart = isStart;
      payload.isEnd = false;
      payload.end = null;
      if (isStart === true) payload.start = new Date();
    }

    if (start) {
      payload.start = new Date(start);
      payload.isStart = true;
      payload.isEnd = false;
      payload.end = null;
    }
    if (end) {
      payload.end = new Date(end);
      payload.isEnd = true;
      payload.isStart = false;
    }

    return payload;
  };

  /*** Use this function to search the database.*/
  export const where = ({ id }: Request): Prisma.ProjectFindUniqueArgs['where'] => {
    const payload: Prisma.ProjectFindUniqueArgs['where'] = { id };
    return payload;
  };

  export const currencyFindUnique = ({ currencyId }: Request): Prisma.CurrencyFindUniqueArgs['where'] => {
    const payload: Prisma.CurrencyFindUniqueArgs['where'] = { id: currencyId };
    return payload;
  };

  export const currencyUpdate = (
    req: Request,
    { id, name }: Database,
    { balance, accountingId }: Currency,
  ): Prisma.CurrencyUpdateInput => {
    const value = Number(req.price);
    const newBalance = balance + value;

    const payload: Prisma.CurrencyUpdateInput = {};

    payload.balance = newBalance;
    payload.projects = { connect: { id: id } };
    payload.income = {
      create: {
        projectId: id,
        value,
        accountingId,
        description: `Income from project ${name}`,
      },
    };

    return payload;
  };
}
