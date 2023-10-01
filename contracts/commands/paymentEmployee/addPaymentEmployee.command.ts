import { Prisma, PaymentEmployee, Employee } from '@prisma/client';

import { ChannelPaymentEmployee } from '../../types';

export namespace AddPaymentEmployeeCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPaymentEmployee = 'add_user_payment_employee';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Required<Omit<PaymentEmployee, 'id'>> {
    salary: number;
    bonus: number;
    paidLeave: number;
    toPayoff: number;
    paid: number;
    duty: number;
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
  }

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({
    employeeId,
    salary,
    bonus,
    paidLeave,
    toPayoff,
    paid,
    duty,
  }: Request): Prisma.PaymentEmployeeCreateArgs['data'] => {
    const payload: Prisma.PaymentEmployeeCreateArgs['data'] = {
      employee: { connect: { id: employeeId } },
      bonus,
      salary,
      paidLeave,
      toPayoff,
      paid,
      duty,
    };

    return payload;
  };
}
