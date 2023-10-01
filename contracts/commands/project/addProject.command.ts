import { Prisma, Project, Work } from '@prisma/client';

import { ChannelProject } from '../../types';

export namespace AddProjectCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelProject = 'add_project';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Required<Pick<Prisma.ProjectCreateInput, 'name' | 'customer'>> {
    name: string;
    customer: string;
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
  }

  /*** These values return from the database.*/
  export class Database implements Project {
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
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.ProjectInclude {
    workers: boolean;
    currencies: boolean;
    accounting: boolean;
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    workers: true,
    currencies: false,
    accounting: false,
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ name, customer }: Request, data: { userId: number } | null): Prisma.ProjectCreateInput => {
    const payload: Prisma.ProjectCreateInput = {
      name,
      customer,
      accounting: {
        connectOrCreate: {
          where: { userId: data?.userId },
          create: { userId: 1 },
        },
      },
    };

    return payload;
  };
}
