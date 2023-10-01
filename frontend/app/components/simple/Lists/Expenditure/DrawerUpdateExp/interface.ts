import { Expenditure } from '@prisma/client';

export interface DrawerUpdateExpenditureForm {
  isRefund?: 'yes' | 'no';
  refundAt?: Expenditure['refundAt'];
  description?: Expenditure['description'];
  currencyName?: Expenditure['currencyName'];
  value?: Expenditure['value'];
  createAt?: Expenditure['createAt'];
}
