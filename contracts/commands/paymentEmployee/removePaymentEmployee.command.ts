import { Prisma, PaymentEmployee, Employee } from '@prisma/client';

import { ChannelPaymentEmployee } from '../../types';

export namespace RemovePaymentEmployeeCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPaymentEmployee = 'remove_user_payment_employee';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    id: PaymentEmployee['id'];
    employeeId: Employee['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
  }

  /*** Use this function to search the database.*/
  export const where = ({ id, employeeId }: Request): Prisma.PaymentEmployeeDeleteArgs['where'] => {
    const payload: Prisma.PaymentEmployeeDeleteArgs['where'] = {
      id,
      employeeId,
    };
    return payload;
  };
}
