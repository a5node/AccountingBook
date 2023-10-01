import { Prisma, Bank, Employee } from '@prisma/client';

import { ChannelBank } from '../../types';

export namespace CreateBankCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelBank = 'create_bank';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    bankname?: string;
    iban?: string;
    linkpay?: string;
    card?: string;
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

  /*** These values return from the database.*/
  export class Database implements Response {
    id: Bank['id'];
    bankname: string | null;
    iban: string | null;
    linkpay: string | null;
    card: string | null;
    employeeId: Employee['id'];
  }

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ bankname, iban, linkpay, card, employeeId }: Request): Prisma.BankCreateInput => {
    const payload: Prisma.BankCreateInput = {
      employee: { connect: { id: employeeId } },
    };

    if (bankname) payload.bankname = bankname;
    if (iban) payload.iban = iban;
    if (linkpay) payload.linkpay = linkpay;
    if (card) payload.card = card;

    return payload;
  };
}
