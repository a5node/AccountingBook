import { Employee, Prisma, HireDate } from '@prisma/client';

import { ChannelHireDate } from '../../types';

export namespace GetUserHireDateQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelHireDate = 'get_user_hire_dates';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    hireDates: Omit<HireDate, 'employeeId'>[];
  }

  /*** These values return from the database.*/
  export class Database {
    hireDates: HireDate[];
  }

  /*** These data should be selected in the response to the `Client app`. */
  export interface Select {
    id: boolean;
    hired: boolean;
    fired: boolean;
    commit: boolean;
  }

  /*** These data should be selected in the response to the `Client app`. */
  export const select: Select = {
    id: true,
    hired: true,
    fired: true,
    commit: true,
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Omit<HireDate, 'employeeId'>[]): Response => {
    return { hireDates: data };
  };

  /*** Use this function to search the database.*/
  export const where = ({ employeeId }: Request): Prisma.HireDateFindManyArgs['where'] => {
    const payload: Prisma.HireDateFindManyArgs['where'] = {
      employeeId,
    };
    return payload;
  };
}
