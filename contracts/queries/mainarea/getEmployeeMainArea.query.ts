import { MainArea, Prisma, Employee } from '@prisma/client';

import { ChannelMainArea } from '../../types';

export namespace GetEmployeeMainAreaQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelMainArea = 'get_employee_main_areas';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements MainArea {
    id: number;
    name: string;
  }

  /*** These values return from the database.*/
  export class Database implements Response {
    id: number;
    name: string;
  }

  /*** Filter response to `Client app` */
  export const filter = (data: Database | null): Response | null => {
    return data;
  };

  /*** Use this function to search the database.*/
  export const where = ({ employeeId }: Request): Prisma.MainAreaWhereInput => {
    return {
      employees: {
        some: { id: employeeId },
      },
    };
  };
}
