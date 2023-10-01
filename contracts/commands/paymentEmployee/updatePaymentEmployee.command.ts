import { Prisma, PaymentEmployee, Employee } from '@prisma/client';

import { ChannelPaymentEmployee } from '../../types';

export namespace UpdatePaymentEmployeeCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPaymentEmployee = 'update_payment_employee';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    salary?: number | string | null;
    bonus?: number | string | null;
    paidLeave?: number | string | null;
    toPayoff?: number | string | null;
    paid?: number | string | null;
    duty?: number | string | null;
    id: PaymentEmployee['id'];
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

  /*** Use this function to search the database.*/
  export const where = ({
    id,
    employeeId,
  }: Pick<Request, 'id' | 'employeeId'>): Prisma.PaymentEmployeeWhereUniqueInput => {
    const payload: Prisma.PaymentEmployeeWhereUniqueInput = { id, employeeId };
    return payload;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({
    bonus,
    salary,
    paidLeave,
    toPayoff,
    paid,
    duty,
  }: Omit<Request, 'id' | 'employeeId'>): Prisma.PaymentEmployeeUpdateInput => {
    const payload: Prisma.PaymentEmployeeUpdateInput = {};

    if (typeof bonus === 'string') payload.bonus = parseFloat(bonus);
    if (typeof salary === 'string') payload.salary = parseFloat(salary);
    if (typeof paidLeave === 'string') payload.paidLeave = parseFloat(paidLeave);
    if (typeof toPayoff === 'string') payload.toPayoff = parseFloat(toPayoff);
    if (typeof paid === 'string') payload.paid = parseFloat(paid);
    if (typeof duty === 'string') payload.duty = parseFloat(duty);
    if (typeof bonus === 'number' && bonus >= 0) payload.bonus = bonus;
    if (typeof salary === 'number' && salary >= 0) payload.salary = salary;
    if (typeof paidLeave === 'number' && paidLeave >= 0) payload.paidLeave = paidLeave;
    if (typeof toPayoff === 'number' && toPayoff >= 0) payload.toPayoff = toPayoff;
    if (typeof paid === 'number' && paid >= 0) payload.paid = paid;
    if (typeof duty === 'number' && duty >= 0) payload.duty = duty;

    return payload;
  };
}
