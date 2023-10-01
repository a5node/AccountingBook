import { User, Prisma, Roles, Accounting, Employee } from '@prisma/client';

import { ChannelUser, DatabaseType, IncludeType, SelectType } from '../../types';

export namespace FindUserQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelUser = 'find_user';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Omit<Prisma.UserWhereUniqueInput, 'password'> {
    email?: string | (Prisma.UserNameEmailCompoundUniqueInput & string);
    id: number | (Prisma.UserNameEmailCompoundUniqueInput & number);
    name?: string | (Prisma.UserNameEmailCompoundUniqueInput & string);
    name_email?:
      | Prisma.UserNameEmailCompoundUniqueInput
      | (string & Prisma.UserNameEmailCompoundUniqueInput)
      | (number & Prisma.UserNameEmailCompoundUniqueInput);
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    image?: string | Prisma.StringNullableFilter<'User'> | null;
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
    accounting?: Accounting | null;
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
    accounting?: Accounting | null;
    roles: DatabaseType.RoleType[];
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.UserInclude {
    roles: SelectType.RolesType;
    employee: IncludeType.EmployeeType;
    profile: IncludeType.ProfileType;
    accounts: boolean;
    sessions: boolean;
    accounting: boolean;
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    accounting: true,
    accounts: true,
    sessions: true,
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
  export const filter = (user: Database | null): Response | null => {
    if (!user) return null;

    const { email, id, name, image, profile, roles, employee, accounting } = user;
    const payload: Response = {
      email,
      id,
      name,
      image,
      profile,
      employee,
      accounting,
      roles: roles?.map(({ role }) => role),
    };

    return payload;
  };
}
