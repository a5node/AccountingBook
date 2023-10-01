import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  salaryPaidOut: number;
  expenditure: number;
  netIncome: number;
  salaryDuty: number;
  income: number;
}
