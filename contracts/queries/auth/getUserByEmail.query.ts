import { Prisma, Roles, User } from '@prisma/client';

import { ChannelAuth, DatabaseType, IncludeType, SelectType } from '../../types';

export namespace GetUserByEmailQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelAuth = 'get_user_by_email';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Required<Pick<User, 'email'>> {
    email: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Omit<User, 'password'> {
    email: string | null;
    id: number;
    name: string;
    image: string | null;
    profile: DatabaseType.ProfileType | null;
    roles: Roles[];
  }

  /*** These values return from the database.*/
  export class Database implements Omit<User, 'password'> {
    email: string | null;
    id: number;
    name: string;
    image: string | null;
    profile: DatabaseType.ProfileType | null;
    roles: DatabaseType.RoleType[];
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.UserInclude {
    roles: SelectType.RolesType;
    employee: IncludeType.EmployeeType;
    profile: IncludeType.ProfileType;
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    profile: {
      include: {
        links: true,
      },
    },
    roles: { select: { role: true } },
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

    const { email, id, name, image, profile, roles } = user;
    const payload: Response = {
      email,
      id,
      name,
      image,
      profile,
      roles: roles.map(({ role }) => role),
    };

    return payload;
  };
}
