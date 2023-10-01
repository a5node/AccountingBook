import { Prisma, Project, Work, Employee, Positions } from '@prisma/client';

import { ChannelWork } from '../../types';

export namespace GetWorkByIdQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelWork = 'get_work_by_id';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Prisma.ProjectWhereUniqueInput, 'id'> {
    id: Work['id'];
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
}
