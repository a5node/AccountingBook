import { Prisma, UserRoles } from '@prisma/client';

import { ChannelRoles } from '../../types';

export namespace RemoveUserRoleCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelRoles = 'remove_user_role';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements UserRoles {
    userId: number;
    roleId: number;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
  }

  /*** Use this function to search the database.*/
  export const where = ({ userId, roleId }: Request): Prisma.UserRolesDeleteArgs['where'] => {
    const payload: Prisma.UserRolesDeleteArgs['where'] = {
      roleId_userId: { userId, roleId },
    };
    return payload;
  };
}
