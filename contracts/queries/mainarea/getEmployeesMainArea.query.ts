import { MainArea, Prisma } from '@prisma/client';

import { ChannelMainArea, DatabaseType } from '../../types';

export namespace GetEmployeesMainAreaQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelMainArea = 'get_employees_main_areas';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Partial<MainArea> {
    id?: number;
    name?: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    employees: DatabaseType.EmployeeType | null;
  }

  /*** These values return from the database.*/
  export class Database implements MainArea {
    id: number;
    name: string;
    employees: DatabaseType.EmployeeType;
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.MainAreaInclude {
    employees: {
      include: {
        payment: boolean;
        banks: boolean;
        hireDates: boolean;
        expenditure: boolean;
        works: boolean;
      };
    };
  }

  /*** These data should be included in the response to the `Client app`. */
  export const include: Include = {
    employees: {
      include: {
        payment: true,
        banks: true,
        hireDates: true,
        works: true,
        expenditure: true,
      },
    },
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Database[] | null): Response[] | null => {
    if (!Array.isArray(data)) return null;
    return data;
  };

  /*** Use this function to search the database.*/
  export const where = ({ id, name }: Request): Prisma.MainAreaWhereInput => {
    const payload: Prisma.MainAreaWhereInput = {
      OR: [{ id }, { name }],
    };
    return payload;
  };
}
