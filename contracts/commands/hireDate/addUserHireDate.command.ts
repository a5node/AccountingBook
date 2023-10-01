import { Prisma, HireDate, Employee } from '@prisma/client';

import { ChannelHireDate } from '../../types';

export namespace AddUserHireDateCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelHireDate = 'add_user_hire_date';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<HireDate, 'employeeId'> {
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
  }

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ employeeId }: Request): Prisma.HireDateCreateArgs['data'] => {
    const payload: Prisma.HireDateCreateArgs['data'] = {
      employee: { connect: { id: employeeId } },
    };

    return payload;
  };
}
