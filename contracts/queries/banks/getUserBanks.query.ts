import { Employee, Prisma, Bank } from '@prisma/client';

import { ChannelBank } from '../../types';

export namespace GetUserBanksQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelBank = 'get_user_banks';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    banks: Omit<Bank, 'employeeId'>[];
  }

  /*** These values return from the database.*/
  export class Database {
    banks: Bank[];
  }

  /*** These data should be selected in the response to the `Client app`. */
  export interface Select {
    id: boolean;
    bankname: boolean;
    iban: boolean;
    linkpay: boolean;
    card: boolean;
  }

  /*** These data should be selected in the response to the `Client app`. */
  export const select: Select = {
    id: true,
    bankname: true,
    iban: true,
    linkpay: true,
    card: true,
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Omit<Bank, 'employeeId'>[]): Response => {
    return { banks: data };
  };

  /*** Use this function to search the database.*/
  export const where = ({ employeeId }: Request): Prisma.BankFindManyArgs['where'] => {
    const payload: Prisma.BankFindManyArgs['where'] = {
      employeeId,
    };
    return payload;
  };
}
