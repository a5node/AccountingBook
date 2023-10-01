import { Employee, Prisma, PaymentEmployee } from '@prisma/client';

import { ChannelPaymentEmployee } from '../../types';

export namespace GetPaymentsEmployeesQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPaymentEmployee = 'get_user_payment_employees';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    paymentsEmployee: Omit<PaymentEmployee, 'employeeId'>[];
  }

  /*** These values return from the database.*/
  export class Database {
    paymentsEmployee: PaymentEmployee[];
  }

  /*** These data should be selected in the response to the `Client app`. */
  export interface Select extends Required<Omit<Prisma.PaymentEmployeeSelect, 'employee'>> {
    id: boolean;
    employeeId: boolean;
    salary: boolean;
    bonus: boolean;
    paidLeave: boolean;
    toPayoff: boolean;
    paid: boolean;
    duty: boolean;
  }

  /*** These data should be selected in the response to the `Client app`. */
  export const select: Select = {
    id: true,
    employeeId: true,
    salary: true,
    bonus: true,
    paidLeave: true,
    toPayoff: true,
    paid: true,
    duty: true,
  };

  /*** Filter response to `Client app` */
  export const filter = (data: Omit<PaymentEmployee, 'employeeId'>[]): Response => {
    return { paymentsEmployee: data };
  };

  /*** Use this function to search the database.*/
  export const where = ({ employeeId }: Request): Prisma.PaymentEmployeeFindManyArgs['where'] => {
    const payload: Prisma.PaymentEmployeeFindManyArgs['where'] = {
      employeeId,
    };
    return payload;
  };
}
