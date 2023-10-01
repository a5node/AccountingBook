import { Prisma, Bank, Employee } from '@prisma/client';

import { ChannelBank } from '../../types';

export namespace RemoveUserBankCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelBank = 'remove_user_bank';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    id: Bank['id'];
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
  }

  /*** Use this function to search the database.*/
  export const where = ({ id, employeeId }: Request): Prisma.BankDeleteArgs['where'] => {
    const payload: Prisma.BankDeleteArgs['where'] = {
      id,
      employeeId,
    };
    return payload;
  };
}
