import { Currency } from '@prisma/client';

export interface DrawerUpdateCurrencyForm {
  shortName?: Currency['shortName'];
  name?: Currency['name'];
  balancePlus?: Currency['balance'];
  balanceMinus?: Currency['balance'];
}
