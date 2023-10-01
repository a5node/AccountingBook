import { Prisma, Roles } from '@prisma/client';

import { ChannelRoles } from '../../types';

export namespace CreateRoleCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelRoles = 'create_role';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.RolesCreateInput {
    role: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Roles {
    id: number;
    role: string;
  }

  /*** These values return from the database.*/
  export class Database implements Response {
    id: number;
    role: string;
  }

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = (data: Request): Prisma.RolesCreateInput => {
    data.role = data.role.toUpperCase();
    return data;
  };
}
