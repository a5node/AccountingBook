import { Prisma, PaymentEmployee, Employee } from '@prisma/client';

import { ChannelPaymentEmployee } from '../../types';

export namespace DeletePaymentEmployeeCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPaymentEmployee = 'delete_payment_employee';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<PaymentEmployee, 'id'> {
    id: PaymentEmployee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements PaymentEmployee {
    id: number;
    salary: number | null;
    bonus: number | null;
    paidLeave: number | null;
    toPayoff: number | null;
    paid: number | null;
    duty: number | null;
    employeeId: Employee['id'];
  }

  /*** Use this function to search the database.*/
  export const where = ({ id }: Pick<Request, 'id'>): Prisma.PaymentEmployeeDeleteArgs['where'] => {
    const payload: Prisma.PaymentEmployeeDeleteArgs['where'] = {
      id,
    };
    return payload;
  };
}
