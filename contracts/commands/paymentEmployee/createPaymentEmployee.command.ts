import { Prisma, PaymentEmployee, Employee } from '@prisma/client';

import { ChannelPaymentEmployee } from '../../types';

export namespace CreatePaymentEmployeeCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPaymentEmployee = 'create_payment_employee';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    salary: number;
    bonus: number;
    paidLeave: number;
    toPayoff: number;
    paid: number;
    duty: number;
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements PaymentEmployee {
    salary: number | null;
    bonus: number | null;
    paidLeave: number | null;
    toPayoff: number | null;
    paid: number | null;
    duty: number | null;
    id: PaymentEmployee['id'];
    employeeId: Employee['id'];
  }

  /*** These values return from the database.*/
  export class Database implements Response {
    salary: number | null;
    bonus: number | null;
    paidLeave: number | null;
    toPayoff: number | null;
    paid: number | null;
    duty: number | null;
    id: PaymentEmployee['id'];
    employeeId: Employee['id'];
  }

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({
    salary,
    bonus,
    paidLeave,
    toPayoff,
    paid,
    duty,
    employeeId,
  }: Request): Prisma.PaymentEmployeeCreateInput => {
    const payload: Prisma.PaymentEmployeeCreateInput = {
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
