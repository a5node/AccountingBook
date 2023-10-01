import { Prisma, HireDate } from '@prisma/client';

import { ChannelHireDate } from '../../types';

export namespace DeleteHireDateCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelHireDate = 'delete_hire_date';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<HireDate, 'id'> {
    id: number;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements HireDate {
    id: number;
    hired: Date;
    fired: Date | null;
    commit: string | null;
    employeeId: number;
  }

  /*** Use this function to search the database.*/
  export const where = ({ id }: Pick<Request, 'id'>): Prisma.HireDateDeleteArgs['where'] => {
    const payload: Prisma.HireDateDeleteArgs['where'] = {
      id,
    };
    return payload;
  };
}
