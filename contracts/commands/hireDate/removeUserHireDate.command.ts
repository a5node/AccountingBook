import { Prisma, HireDate, Employee } from '@prisma/client';

import { ChannelHireDate } from '../../types';

export namespace RemoveUserHireDateCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelHireDate = 'remove_user_hire_date';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    id: HireDate['id'];
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
  }

  /*** Use this function to search the database.*/
  export const where = ({ id, employeeId }: Request): Prisma.HireDateDeleteArgs['where'] => {
    const payload: Prisma.HireDateDeleteArgs['where'] = {
      id,
      employeeId,
    };
    return payload;
  };
}
