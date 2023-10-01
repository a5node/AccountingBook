import { TFindAccountingByUserQueryRes, TFindCurrencysQueryRes } from '@interface/contracts.types';
import { DateFns, Period, TSelectDate } from '@lib/DateFns';
import { Work } from '@prisma/client';

export type ValueCurrency = {
  expenditure?: number;
  salary?: number;
  balance?: number;
  balanceDay?: number;
  income?: number;
};

export type ValueCurrencyDashboard = TSelectDate & ValueCurrency;

export type CurrenciesDashboard = {
  shortName: string;
  balance: number;
  name: string;
  values: ValueCurrencyDashboard[];
};

export type NetIncomeSalaryDuty = {
  salary: number;
  netIncome: number;
  salaryDutyList: ValueCurrencyDashboard[];
  netIncomeList: ValueCurrencyDashboard[];
  balanceList: ValueCurrencyDashboard[];
};

export type BalanceExp = TFindCurrencysQueryRes['expenditure'][0];
export type BalanceIncome = TFindCurrencysQueryRes['income'][0];
export type BalanceList = TFindCurrencysQueryRes['expenditure'] | TFindCurrencysQueryRes['income'];

export type CurrencyPeriod = Period;
export type ExpValueName = 'expenditure' | 'income' | 'salary';
export class HelperCurrenciesList {
  public months = new Map<string, number>();
  public days = new Map<string, number>();
  public dateFns: DateFns;

  constructor() {
    this.dateFns = new DateFns();
  }

  expValue = (exp: BalanceExp | BalanceIncome, name: ExpValueName = 'expenditure'): ValueCurrencyDashboard => {
    const selectDate = this.dateFns.getSelectDate(exp.createAt);
    const value: ValueCurrencyDashboard = { ...selectDate };
    if (exp.employeeId) value.salary = exp.value;
    else if (exp.isRefund) value[name] = 0;
    else value[name] = exp.value;
    return value;
  };

  expList = (data?: BalanceList, period?: Period, name?: ExpValueName): ValueCurrencyDashboard[] => {
    if (!data) return [];
    const values: ValueCurrencyDashboard[] = [];
    for (const exp of data) {
      const isValid = this.dateFns.isPeriod(exp.createAt, period);
      if (!isValid) continue;
      const value: ValueCurrencyDashboard = this.expValue(exp, name);
      values.push(value);
    }
    return values;
  };

  expAndIncome = (data?: BalanceList, period?: Period, name?: ExpValueName): ValueCurrencyDashboard[] => {
    if (!data) return [];

    const values: ValueCurrencyDashboard[] = [];

    for (const exp of data) {
      const isValid = this.dateFns.isPeriod(exp.createAt, period);

      if (!isValid) continue;

      const value: ValueCurrencyDashboard = this.expValue(exp, name);

      values.push(value);
    }
    return values;
  };

  netIncome = ({ price, salary }: { price: number; salary: number }): number => {
    return price - salary;
  };

  works = (workers: Work[]): number => {
    let salary = 0;
    for (const worker of workers) {
      if (worker.hours && worker.rate) {
        const paid = worker.hours * worker.rate;
        salary = salary + paid;
      }
    }
    return salary;
  };

  netIncomeSalaryDuty = (
    projects?: TFindAccountingByUserQueryRes['projects'],
    period?: Period,
  ): NetIncomeSalaryDuty => {
    const payload: NetIncomeSalaryDuty = {
      salary: 0,
      netIncome: 0,
      salaryDutyList: [],
      balanceList: [],
      netIncomeList: [],
    };

    if (!projects) return payload;

    for (const project of projects) {
      const isValid = this.dateFns.isPeriod(project.start, period);
      if (!isValid) continue;

      const selectDate: TSelectDate = this.dateFns.getSelectDate(project.start || project.createAt);

      const salary = this.works(project.workers);
      payload.salary = payload.salary + salary;

      const netIncome = this.netIncome({ price: project.price, salary });
      payload.netIncome = payload.netIncome + netIncome;

      payload.balanceList.push({ ...selectDate, balance: project.price });
      payload.salaryDutyList.push({ ...selectDate, balance: salary });
      payload.netIncomeList.push({ ...selectDate, balance: netIncome });
    }

    return payload;
  };

  sortBalance = (dateName: string, currencies: ValueCurrencyDashboard[], key: keyof TSelectDate = 'month'): number => {
    let value = 0;

    for (const currency of currencies) {
      if (dateName === currency[key]) {
        if (currency.expenditure) value = value + currency.expenditure;
        if (currency.salary) value = value + currency.salary;
        if (currency.balance) value = value + currency.balance;
        if (currency.income) value = value + currency.income;
        if (currency.balanceDay) value = value + currency.balanceDay;
      }
    }

    return value;
  };
}
