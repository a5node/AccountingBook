import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { ValueCurrencyDashboard } from '@hooks/hooks';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  salaryPaidOutList: ValueCurrencyDashboard[];
  expenditureList: ValueCurrencyDashboard[];
  projectList: ValueCurrencyDashboard[];
  netIncomeList: ValueCurrencyDashboard[];
  salaryDutyList: ValueCurrencyDashboard[];
  incomeList: ValueCurrencyDashboard[];
  salaryPaidOut: number;
  expenditure: number;
  netIncome: number;
  salaryDuty: number;
  income: number;
}
