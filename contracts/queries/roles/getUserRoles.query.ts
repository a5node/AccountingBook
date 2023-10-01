import { Roles, UserRoles } from '@prisma/client';

import { ChannelRoles, DatabaseType } from '../../types';

export namespace GetUserRolesQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelRoles = 'get_user_roles';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Required<UserRoles> {
    userId: number;
    roleId: number;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    roles: Roles[];
  }

  /*** These values return from the database.*/
  export class Database {
    role: DatabaseType.RoleType;
  }

  /*** These data should be selected in the response to the `Client app`. */
  export interface Select {
    role: boolean;
  }

  /*** These data should be selected in the response to the `Client app`. */
  export const select: Select = {
    role: true,
  };

  /*** Filter response to `Client app` */
  export const filter = (data: DatabaseType.RoleType[] | null): Response | null => {
    if (!Array.isArray(data)) return null;
    const roles = data.map(({ role }) => role);
    return { roles };
  };

  /*** Use this function to search the database.*/
  export const where = ({ userId }: Request): { userId: number } => {
    return { userId };
  };
}
