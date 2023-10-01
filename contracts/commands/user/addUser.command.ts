import { Prisma, User, Employee, Roles } from '@prisma/client';

import { ChannelUser, DatabaseType, IncludeType, SelectType } from '../../types';

export namespace AddUserCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelUser = 'add_user';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Required<Pick<Prisma.UserCreateInput, 'name' | 'email' | 'image'>> {
    role: Roles;
    name: string;
    email: string;
    image: string | null;
    profile: Partial<
      Omit<Prisma.ProfileCreateInput, 'links'> & {
        cvUrl: string;
      }
    >;
    employee: Pick<Employee, 'isHired' | 'position' | 'mainArea' | 'positionName'>;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Omit<User, 'password'> {
    email: string | null;
    id: number;
    name: string;
    image: string | null;
    profile: DatabaseType.ProfileType | null;
    roles: Roles[];
    employee?: Employee | null;
  }

  /*** These values return from the database.*/
  export class Database implements Omit<User, 'password'> {
    email: string | null;
    id: number;
    name: string;
    image: string | null;
    profile: DatabaseType.ProfileType | null;
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
  export const data = (data: Request): Prisma.UserCreateInput => {
    const employee: Prisma.EmployeeCreateNestedOneWithoutUserInput['create'] = {
      isHired: undefined,
      positionName: undefined,
      payment: undefined,
      mainAreaModel: {},
      positionModel: {},
    };

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

    const { age, photo, email, phone, name, patronymic, surname } = data.profile;

    if (data.role) {
      const { role } = data.role;
      if (role !== 'CANDIDATE') employee.payment = { create: {} };
    }

    const payload: Prisma.UserCreateInput = {
      name: data.name,
      email: data.email,
      image: data.image,
      employee: { create: employee },
      roles: { create: { role: { connect: { id: data.role.id, role: data.role.role } } } },
      profile: {
        create: { age, photo, email, phone, name, patronymic, surname },
      },
    };

    return payload;
  };

  export const cvUrl = (data: Request, { profile }: Database): Prisma.LickProfileCreateArgs['data'] => {
    let payload: Prisma.LickProfileCreateArgs['data'] = {
      name: '',
      url: '',
      profile: { connect: { id: profile?.id } },
    };

    if (profile && profile.id) {
      if (data.profile) {
        const { cvUrl } = data.profile;
        if (cvUrl) payload = { name: 'CV', url: cvUrl, profile: { connect: { id: profile?.id } } };
      }
    }

    return payload;
  };
}
