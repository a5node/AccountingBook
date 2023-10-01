import { User, Prisma, Employee, Roles } from '@prisma/client';

import { ChannelUser, IncludeType, SelectType, DatabaseType } from '../../types';

export namespace FindUsersQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelUser = 'find_users';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Omit<Prisma.UserWhereUniqueInput, 'password'> {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    profile?:
      | (Prisma.Without<Prisma.ProfileNullableRelationFilter, Prisma.ProfileWhereInput> & Prisma.ProfileWhereInput)
      | (Prisma.Without<Prisma.ProfileWhereInput, Prisma.ProfileNullableRelationFilter> &
          Prisma.ProfileNullableRelationFilter)
      | null;
    employee?:
      | (Prisma.Without<Prisma.EmployeeNullableRelationFilter, Prisma.EmployeeWhereInput> & Prisma.EmployeeWhereInput)
      | (Prisma.Without<Prisma.EmployeeWhereInput, Prisma.EmployeeNullableRelationFilter> &
          Prisma.EmployeeNullableRelationFilter)
      | null;
    roles?: Prisma.UserRolesListRelationFilter | undefined;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Omit<User, 'password'> {
    id: number;
    name: string;
    email: string | null;
    image: string | null;
    profile?: DatabaseType.ProfileType | null;
    employee?: Employee | null;
    roles?: Roles[];
  }

  /*** These values return from the database.*/
  export class Database implements Omit<Response, 'roles'> {
    id: number;
    name: string;
    email: string | null;
    image: string | null;
    profile?: DatabaseType.ProfileType | null;
    employee?: Employee | null;
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
    profile: { include: { links: true } },
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
  export const filter = (users: Database[] | null): Response[] | null => {
    if (!users) return null;

    return users.map(user => {
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
    });
  };
}
