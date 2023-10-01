import { Employee, PaymentEmployee, Prisma, Profile, Roles, User } from '@prisma/client';

import { ChannelUser, DatabaseType, IncludeType, SelectType } from '../../types';

export namespace UpdateUserCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelUser = 'update_user';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Partial<User> {
    id: number;
    name?: string;
    email?: string | null;
    password?: string | null;
    image?: string | null;
    profile?: Partial<Profile>;
    employee?: Partial<Pick<Employee, 'isHired' | 'position' | 'mainArea' | 'positionName'>>;
    role?: Roles['role'];
    payment?: PaymentEmployee;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Omit<User, 'password'> {
    id: number;
    name: string;
    email: string | null;
    image: string | null;
    profile?: Profile | null;
    employee?: Employee | null;
    roles?: Roles[];
  }

  /*** These values return from the database.*/
  export class Database implements Omit<User, 'password'> {
    email: string | null;
    id: number;
    name: string;
    image: string | null;
    profile: Profile | null;
    roles: DatabaseType.RoleType[];
    employee?: Employee | null;
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
      roles: roles.map(({ role }) => role),
    };

    return payload;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = (data: Omit<Request, 'id'>): Prisma.UserUpdateInput => {
    const employee: Prisma.EmployeeUpdateOneWithoutUserNestedInput['update'] = {};

    if (data.role) {
      if (data.role !== 'CANDIDATE') {
        employee.payment = { update: data.payment };
      }
    }

    if (data.employee) {
      if ('isHired' in data.employee) employee.isHired = data.employee?.isHired;
      if ('positionName' in data.employee) {
        employee.positionName = data.employee?.positionName;
      }
      if ('mainArea' in data.employee) {
        employee.mainAreaModel = { connect: { name: data.employee?.mainArea } };
      }
      if ('position' in data.employee) {
        employee.positionModel = { connect: { name: data.employee?.position } };
      }
    }

    const payload: Prisma.UserUpdateInput = {
      name: data.name,
      email: data.email,
      image: data.image,
      employee: { update: employee },
      profile: { update: data.profile },
    };

    return payload;
  };
}
