import { Prisma, Roles } from '@prisma/client';

import { ChannelRoles } from '../../types';

export namespace DeleteRolesCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelRoles = 'delete_role';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Roles, 'id'> {
    id: number;
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
}
