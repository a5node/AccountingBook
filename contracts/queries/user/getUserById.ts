import { User, Prisma, Roles } from '@prisma/client';

import { ChannelUser, DatabaseType, IncludeType, SelectType } from '../../types';

export namespace GetUserByIdQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelUser = 'get_user_by_id';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Prisma.UserWhereUniqueInput, 'id'> {
    id: number;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Omit<User, 'password'> {
    id: number;
    name: string;
    email: string | null;
    image: string | null;
    profile?: DatabaseType.ProfileType | null;
    employee?: DatabaseType.EmployeeType | null;
    roles?: Roles[];
  }

  /*** These values return from the database.*/
  export class Database implements Omit<Response, 'roles'> {
    id: number;
    name: string;
    email: string | null;
    image: string | null;
    profile: DatabaseType.ProfileType | null;
    employee: DatabaseType.EmployeeType | null;
    roles: DatabaseType.RoleType[];
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.UserInclude {
    roles: SelectType.RolesType;
    // employee: IncludeType.EmployeeType;
    profile: IncludeType.ProfileType;
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    roles: { select: { role: true } },
    profile: { include: { links: true } },
    employee: {
      include: {
        payment: true,
        banks: true,
        hireDates: true,
        works: true,
        expenditure: true,
        income: true,
      },
    },
  };

  /*** Filter response to `Client app` */
  export const filter = (user: Database | null): Response | null => {
    if (!user) return null;

    const { email, id, name, image, profile, roles, employee } = user;
    const payload: Response = {
      email,
      id,
      name,
      image,
      profile,
      employee,
      roles: roles?.map(({ role }) => role),
    };

    return payload;
  };
}
