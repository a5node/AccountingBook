import { Prisma, HireDate } from '@prisma/client';

import { ChannelHireDate } from '../../types';

export namespace UpdateHireDateCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelHireDate = 'update_hire_date';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    id: number;
    employeeId: number;
    hired?: Date | boolean;
    fired?: Date | boolean;
    commit?: string;
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
  export const where = ({ id, employeeId }: Pick<Request, 'id' | 'employeeId'>): Prisma.HireDateWhereUniqueInput => {
    const payload: Prisma.HireDateWhereUniqueInput = { id, employeeId };
    return payload;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ hired, fired, commit }: Omit<Request, 'id' | 'employeeId'>): Prisma.HireDateUpdateInput => {
    const payload: Prisma.HireDateUpdateInput = {};

    if (typeof hired === 'boolean') payload.hired = new Date();
    else if (hired) payload.hired = hired;

    if (typeof fired === 'boolean') payload.fired = new Date();
    else if (fired) payload.fired = fired;

    if (commit) payload.commit = commit;

    return payload;
  };
}
