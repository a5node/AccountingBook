import { Prisma, Work, Project, Employee, Positions } from '@prisma/client';

import { ChannelWork } from '../../types';

export namespace UpdateWorkCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelWork = 'update_work';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Partial<Work> {
    id: Work['id'];
    employeeId?: Employee['id'];
    projectId?: Project['id'];
    position?: Positions['name'];
    hours?: number;
    rate?: number;
    positionName?: string;
    isWork?: boolean;
    end?: Date;
    start?: Date;
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
  export class Database implements Response {
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
  export const data = (data: Omit<Request, 'id'>): Prisma.WorkUpdateInput => {
    const { hours, rate, positionName, isWork, projectId, employeeId, position, start, end } = data;
    const payload: Prisma.WorkUpdateInput = {};

    if (rate) payload.rate = Number(rate);
    if (hours) payload.hours = Number(hours);
    if (isWork) payload.isWork = isWork;
    if (start) payload.start = new Date(start);
    if (end) payload.end = new Date(end);
    if (positionName) payload.positionName = positionName;

    if (typeof isWork === 'boolean') {
      payload.isWork = isWork;
      if (!payload.end) {
        if (isWork === false) payload.end = new Date();
        if (isWork === true) payload.end = null;
      }
    }

    if (position) payload.positionModel = { connect: { name: position } };
    if (projectId) payload.project = { connect: { id: projectId } };
    if (employeeId) payload.employee = { connect: { id: employeeId } };

    return payload;
  };
}
