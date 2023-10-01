import { Income } from '@prisma/client';

export interface DrawerUpdateIncomeForm {
  isRefund?: 'yes' | 'no';
  refundAt?: Income['refundAt'];
  description?: Income['description'];
  currencyName?: Income['currencyName'];
  value?: Income['value'];
  createAt?: Income['createAt'];
}
