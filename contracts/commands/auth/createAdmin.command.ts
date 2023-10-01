import { Prisma, User } from '@prisma/client';

import { ChannelAuth } from '../../types';

export namespace CreateAdminCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelAuth = 'create_admin';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Required<Pick<Prisma.UserCreateInput, 'name' | 'email' | 'password'>> {
    name: string;
    email: string;
    password: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Omit<Prisma.UserCreateInput, 'password'> {
    email: string | null;
    id: number;
    name: string;
    image: string | null;
  }

  /*** These data should be selected in the response to the `Client app`. */
  export interface Select extends Prisma.UserSelect {
    id: boolean;
    name: boolean;
    email: boolean;
    image: boolean;
  }

  /*** These data should be selected in the response to the `Client app`. */
  export const select: Select = {
    id: true,
    name: true,
    email: true,
    image: true,
  };

  /*** Filter response to `Client app` */
  export const filter = (user: User | null): Response | null => {
    if (!user) return null;

    const filterUser = { ...user, password: undefined };
    delete filterUser.password;
    return filterUser;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = (data: Request): Prisma.UserCreateInput => {
    const roles: Prisma.UserRolesCreateNestedManyWithoutUserInput = {
      create: {
        role: {
          connect: { role: 'ADMIN' },
        },
      },
    };

    const employee: Prisma.EmployeeCreateNestedOneWithoutUserInput = {
      create: {
        payment: { create: {} },
        mainAreaModel: { connect: { name: 'seo' } },
        positionModel: { connect: { name: 'seo' } },
      },
    };

    const payload: Prisma.UserCreateInput = {
      ...data,
      roles,
      employee,
      accounting: { create: {} },
      profile: { create: {} },
    };

    return payload;
  };
}
