import { Prisma, Roles } from '@prisma/client';

import { ChannelRoles } from '../../types';

export namespace UpdateRolesCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelRoles = 'update_role';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Roles {
    id: number;
    role: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Roles {
    id: number;
    role: string;
  }
  /*** Use this function to search the database.*/
  export const where = ({ id }: Omit<Request, 'role'>): Prisma.RolesWhereUniqueInput => {
    const payload: Prisma.RolesWhereUniqueInput = {
      id,
      NOT: [{ role: 'ADMIN' }, { role: 'CANDIDATE' }, { role: 'EMPLOYEE' }, { role: 'USER' }],
    };
    return payload;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ role }: Omit<Request, 'id'>): Prisma.RolesUpdateInput => {
    return { role: role.toUpperCase() };
  };
}
