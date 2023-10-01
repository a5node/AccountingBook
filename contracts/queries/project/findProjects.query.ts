import { Project, Prisma, Work, Expenditure, Currency, Income } from '@prisma/client';

import { ChannelProject } from '../../types';

export namespace FindProjectsQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelProject = 'find_projects';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.ProjectWhereInput {
    AND?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    OR?: Prisma.ProjectWhereInput[];
    NOT?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    workers?: Prisma.WorkListRelationFilter;
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
  export const filter = (data: Database[] | null): Response[] | null => {
    if (!data) return null;
    return data;
  };
}
