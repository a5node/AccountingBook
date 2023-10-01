import { Prisma, Bank, Employee } from '@prisma/client';

import { ChannelBank } from '../../types';

export namespace UpdateBankCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelBank = 'update_bank';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    id: Bank['id'];
    bankname: string | null;
    iban: string | null;
    linkpay: string | null;
    card: string | null;
    employeeId: Employee['id'];
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
  export const where = ({ id, employeeId }: Pick<Request, 'id' | 'employeeId'>): Prisma.BankWhereUniqueInput => {
    const payload: Prisma.BankWhereUniqueInput = { id, employeeId };
    return payload;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({
    bankname,
    iban,
    linkpay,
    card,
  }: Omit<Request, 'id' | 'employeeId'>): Prisma.BankUpdateInput => {
    const payload: Prisma.BankUpdateInput = {};

    if (bankname) payload.bankname = bankname;
    if (iban) payload.iban = iban;
    if (linkpay) payload.linkpay = linkpay;
    if (card) payload.card = card;

    return payload;
  };
}
