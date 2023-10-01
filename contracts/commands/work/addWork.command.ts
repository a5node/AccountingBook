import { Prisma, Work, Project, Employee, Positions } from '@prisma/client';

import { ChannelWork } from '../../types';

export namespace AddWorkCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelWork = 'add_work';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Omit<Prisma.WorkCreateInput, 'positionModel' | 'employee' | 'project' | 'end'> {
    hours: number;
    rate: number;
    positionName: string;
    isWork: boolean;
    start: Date;
    projectId: Project['id'];
    employeeId: Employee['id'];
    position: Positions['name'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Work {
    id: Work['id'];
    employeeId: number;
    projectId: number;
    position: string;
    hours: number;
    rate: number;
    positionName: string;
    isWork: boolean;
    start: Date;
    end: Date | null;
    project: Project;
    employee: Employee;
    positionModel: Positions;
  }

  /*** These values return from the database.*/
  export class Database implements Work {
    id: Work['id'];
    employeeId: number;
    projectId: number;
    position: string;
    hours: number;
    rate: number;
    positionName: string;
    isWork: boolean;
    start: Date;
    end: Date | null;
    project: Project;
    employee: Employee;
    positionModel: Positions;
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.WorkInclude {
    project: boolean;
    employee: boolean;
    positionModel: boolean;
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    project: true,
    employee: true,
    positionModel: true,
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    if (!data) return null;
    return data;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({
    hours,
    rate,
    positionName,
    isWork,
    start,
    projectId,
    employeeId,
    position,
  }: Request): Prisma.WorkCreateInput => {
    const payload: Prisma.WorkCreateInput = {
      project: { connect: { id: projectId } },
      employee: { connect: { id: employeeId } },
      positionModel: { connect: { name: position } },
      hours: Number(hours),
      rate: Number(rate),
      positionName,
      isWork,
      start: new Date(start),
    };

    return payload;
  };
}
