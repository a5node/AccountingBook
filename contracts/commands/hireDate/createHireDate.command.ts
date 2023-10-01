import { Prisma, HireDate, Employee } from '@prisma/client';

import { ChannelHireDate } from '../../types';

export namespace CreateHireDateCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelHireDate = 'create_hire_date';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    hired?: Date;
    fired?: Date;
    commit?: string;
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements HireDate {
    id: number;
    hired: Date;
    fired: Date | null;
    commit: string | null;
    employeeId: Employee['id'];
  }

  /*** These values return from the database.*/
  export class Database implements Response {
    id: number;
    hired: Date;
    fired: Date | null;
    commit: string | null;
    employeeId: Employee['id'];
  }

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ hired, fired, commit, employeeId }: Request): Prisma.HireDateCreateInput => {
    const payload: Prisma.HireDateCreateInput = {
      employee: { connect: { id: employeeId } },
    };

    if (hired) payload.hired = hired;
    if (fired) payload.fired = fired;
    if (commit) payload.commit = commit;

    return payload;
  };
}
