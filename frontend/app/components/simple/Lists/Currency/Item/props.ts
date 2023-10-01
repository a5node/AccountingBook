import { Accounting, Currency, Expenditure } from '@prisma/client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  currency: Currency & {
    expenditure: Expenditure[];
    accounting: Accounting;
  };
  remove: (id: number) => void;
}
