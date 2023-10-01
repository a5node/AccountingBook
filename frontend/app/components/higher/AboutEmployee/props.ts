import { Bank, Employee, Expenditure, HireDate, PaymentEmployee, Roles, Work } from '@prisma/client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  roles?: Roles[];
  employee?:
    | (Employee & {
        payment?: PaymentEmployee | null;
        hireDates?: HireDate[];
        expenditure?: Expenditure[];
        banks?: Bank[];
        works?: Work[];
      })
    | null;
}
