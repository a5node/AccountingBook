import { Prisma, Employee } from '@prisma/client';

import { ChannelMainArea } from '../../types';

export namespace AddEmployeeMainAreaCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelMainArea = 'add_employee_main_area';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.MainAreaCreateInput {
    name: string;
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
  }

  /*** Use this function to search the database.*/
  export const where = ({ employeeId }: Request): Prisma.MainAreaWhereInput | null => {
    return {
      employees: {
        every: {
          id: employeeId,
        },
      },
    };
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ name }: Request): Prisma.MainAreaCreateInput => {
    const payload: Prisma.MainAreaCreateInput = { name };
    return payload;
  };
}
