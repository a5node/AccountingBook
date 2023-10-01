import { Prisma, Bank, Employee } from '@prisma/client';

import { ChannelBank } from '../../types';

export namespace AddUserBankCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelBank = 'add_user_bank';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Partial<Omit<Bank, 'id'>> {
    bankname?: string;
    iban?: string;
    linkpay?: string;
    card?: string;
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
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
