import { Prisma, User, Roles } from '@prisma/client';

import { ChannelAuth, SelectType, DatabaseType } from '../../types';

export namespace SignInQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelAuth = 'sign_in';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    name?: string;
    password: string;
    email?: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Omit<User, 'password'> {
    id: number;
    name: string;
    email: string | null;
    image: string | null;
    roles: Roles[];
    refreshToken: string;
    accessToken: string;
  }

  /*** These values return from the database.*/
  export class Database implements Omit<User, 'password'> {
    email: string | null;
    id: number;
    name: string;
    image: string | null;
    roles: DatabaseType.RoleType[];
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.UserInclude {
    roles: SelectType.RolesType;
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    roles: { select: { role: true } },
  };

  /*** Filter response to `Client app` */
  export const filter = (user: (Database & { refreshToken: string; accessToken: string }) | null): Response | null => {
    if (!user) return null;

    const { email, id, name, image, roles, refreshToken, accessToken } = user;

    const payload: Response = {
      email,
      id,
      name,
      image,
      refreshToken,
      accessToken,
      roles: roles.map(({ role }) => role),
    };

    return payload;
  };

  /*** Use this function to search the database.*/
  export const where = ({ name, email }: Omit<Request, 'password'>): Prisma.UserWhereUniqueInput => {
    if (email) return { email };
    if (name) return { name };
    return { id: -1 };
  };
}
