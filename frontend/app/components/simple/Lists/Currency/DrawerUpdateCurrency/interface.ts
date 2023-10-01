import { Currency } from '@prisma/client';

export interface DrawerUpdateCurrencyForm {
  balancePlus?: Currency['balance'];
  balanceMinus?: Currency['balance'];
  shortName?: Currency['shortName'];
  name?: Currency['name'];
}
