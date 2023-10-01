import { Project, Prisma, Work, Employee, Positions } from '@prisma/client';

import { ChannelWork } from '../../types';

export namespace FindWorksQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelWork = 'find_works';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.WorkWhereInput {
    AND?: Prisma.WorkWhereInput | Prisma.WorkWhereInput[];
    OR?: Prisma.WorkWhereInput[];
    NOT?: Prisma.WorkWhereInput | Prisma.WorkWhereInput[];
    positionModel?:
      | (Prisma.Without<Prisma.PositionsRelationFilter, Prisma.PositionsWhereInput> & Prisma.PositionsWhereInput)
      | (Prisma.Without<Prisma.PositionsWhereInput, Prisma.PositionsRelationFilter> & Prisma.PositionsRelationFilter)
      | undefined;
    employee?:
      | (Prisma.Without<Prisma.EmployeeRelationFilter, Prisma.EmployeeWhereInput> & Prisma.EmployeeWhereInput)
      | (Prisma.Without<Prisma.EmployeeWhereInput, Prisma.EmployeeRelationFilter> & Prisma.EmployeeRelationFilter)
      | undefined;
    project?:
      | (Prisma.Without<Prisma.ProjectRelationFilter, Prisma.ProjectWhereInput> & Prisma.ProjectWhereInput)
      | (Prisma.Without<Prisma.ProjectWhereInput, Prisma.ProjectRelationFilter> & Prisma.ProjectRelationFilter)
      | undefined;
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
  export const filter = (data: Database[] | null): Response[] | null => {
    if (!data) return null;
    return data;
  };
}
