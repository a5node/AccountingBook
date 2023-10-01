import { Prisma, Employee } from '@prisma/client';

import { ChannelPositions } from '../../types';

export namespace AddEmployeePositionCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPositions = 'add_employee_position';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.PositionsCreateInput {
    name: string;
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
  }

  /*** Use this function to search the database.*/
  export const where = ({ employeeId }: Request): Prisma.PositionsWhereInput | null => {
    return {
      employees: {
        every: {
          id: employeeId,
        },
      },
    };
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ name }: Request): Prisma.PositionsCreateInput => {
    const payload: Prisma.PositionsCreateInput = { name };
    return payload;
  };
}
