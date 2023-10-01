import { Prisma, Bank, Employee } from '@prisma/client';

import { ChannelBank } from '../../types';

export namespace DeleteBankCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelBank = 'delete_bank';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Bank, 'id'> {
    id: Bank['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Bank {
    id: Bank['id'];
    bankname: string | null;
    iban: string | null;
    linkpay: string | null;
    card: string | null;
    employeeId: Employee['id'];
  }

  /*** Use this function to search the database.*/
  export const where = ({ id }: Pick<Request, 'id'>): Prisma.BankDeleteArgs['where'] => {
    const payload: Prisma.BankDeleteArgs['where'] = {
      id,
    };
    return payload;
  };
}
