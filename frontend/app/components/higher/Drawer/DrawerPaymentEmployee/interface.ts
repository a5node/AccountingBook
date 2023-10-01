import { PaymentEmployee } from '@prisma/client';

export interface PaymentEmployeeForm {
  salary: PaymentEmployee['salary'];
  bonus: PaymentEmployee['bonus'];
  paidLeave: PaymentEmployee['paidLeave'];
  toPayoff: PaymentEmployee['toPayoff'];
  paid: PaymentEmployee['paid'];
  duty: PaymentEmployee['duty'];
}
