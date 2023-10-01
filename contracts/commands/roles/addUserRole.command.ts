import { Prisma, UserRoles } from '@prisma/client';

import { ChannelRoles } from '../../types';

export namespace AddUserRoleCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelRoles = 'add_user_role';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements UserRoles {
    userId: number;
    roleId: number;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
  }

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ userId, roleId }: Request): Prisma.UserRolesCreateArgs['data'] => {
    const payload: Prisma.UserRolesCreateArgs['data'] = {
      roleId,
      userId,
    };
    return payload;
  };
}
