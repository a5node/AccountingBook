import { Positions, Prisma, Work } from '@prisma/client';

import { ChannelPositions, DatabaseType } from '../../types';

export namespace GetEmployeesPositionsQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPositions = 'get_employees_positions';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Partial<Positions> {
    id?: number;
    name?: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    employees: DatabaseType.EmployeeType;
  }

  /*** These values return from the database.*/
  export class Database implements Positions {
    id: number;
    name: string;
    workers: Work[];
    employees: DatabaseType.EmployeeType;
  }

  /*** These data should be included in the response to the `Client app`. */
  export interface Include extends Prisma.PositionsInclude {
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
  export const filter = (data: any | Database[] | null): Response[] | null => {
    if (!Array.isArray(data)) return null;
    return data;
  };

  /*** Use this function to search the database.*/
  export const where = ({ id, name }: Request): Prisma.PositionsWhereInput => {
    const payload: Prisma.PositionsWhereInput = {
      OR: [{ id }, { name }],
    };
    return payload;
  };
}
