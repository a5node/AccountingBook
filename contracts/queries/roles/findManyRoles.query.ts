import { Roles, Prisma } from '@prisma/client';

import { ChannelRoles } from '../../types';

export namespace FindManyRolesQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelRoles = 'find_many_roles';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export type Request = undefined;

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Roles {
    id: number;
    role: string;
  }
  /*** Use this function to search the database.*/
  export const where = (): Prisma.RolesFindManyArgs['where'] => {
    const payload: Prisma.RolesFindManyArgs['where'] = {
      NOT: { role: 'ADMIN' },
    };
    return payload;
  };
}
