'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { ReqError, TFindAccountingByUserQueryRes } from '@interface/contracts.types';
import { useUserContext } from '@app/contexts';
import { useToggleStore } from '@store/toggles';

import { HelperCurrenciesList, CurrencyPeriod, ValueCurrencyDashboard } from './HelperCurrenciesList';
import { useFindAccountingByUser } from '@hooks/accounting';

export const useAccounting = (
  period?: CurrencyPeriod,
): {
  data: TFindAccountingByUserQueryRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  projectList: ValueCurrencyDashboard[];
  netIncomeList: ValueCurrencyDashboard[];
  salaryDutyList: ValueCurrencyDashboard[];
  salaryPaidOutList: ValueCurrencyDashboard[];
  expenditureList: ValueCurrencyDashboard[];
  incomeList: ValueCurrencyDashboard[];
  income: number;
  salaryPaidOut: number;
  expenditure: number;
  netIncome: number;
  salaryDuty: number;
  reload: () => Promise<void>;
  reset: () => void;
} => {
  const helper = new HelperCurrenciesList();
  const toast = useToast();
  const { user } = useUserContext();
  const { data, error, isLoading, get, reset } = useFindAccountingByUser();
  const {
    setReloadCurrencies,
    setReloadAccounting,
    toggles: { reloadCurrencies, reloadAccounting },
  } = useToggleStore();

  const [salaryDutyList, setSalaryDutyList] = useState<ValueCurrencyDashboard[]>([]);
  const [netIncomeList, setIetIncomeList] = useState<ValueCurrencyDashboard[]>([]);
  const [projectList, setProjectList] = useState<ValueCurrencyDashboard[]>([]);
  const [salaryPaidOutList, setSalaryPaidOutList] = useState<ValueCurrencyDashboard[]>([]);
  const [expenditureList, setExpenditureList] = useState<ValueCurrencyDashboard[]>([]);
  const [incomeList, setIncomeList] = useState<ValueCurrencyDashboard[]>([]);
  const [salaryPaidOut, setSalaryPaidOut] = useState<number>(0);
  const [expenditure, setExpenditure] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [netIncome, setNetIncome] = useState<number>(0);
  const [salaryDuty, setSalaryDuty] = useState<number>(0);

  const handlerDashboard = () => {
    const values = helper.expList(data?.expenditure, period);
    const balanceIncome = helper.expList(data?.income, period, 'income');
    const salaryAndNetIncome = helper.netIncomeSalaryDuty(data?.projects, period);

    let salary = 0;
    let expand = 0;
    let inc = 0;
    for (const item of values) {
      if (item.salary) {
        setSalaryPaidOutList((pre: ValueCurrencyDashboard[]) => [...pre, item]);
        salary = salary + item.salary;
      } else if (item.expenditure) {
        setExpenditureList((pre: ValueCurrencyDashboard[]) => [...pre, item]);
        expand = expand + item.expenditure;
      }
    }

    for (const item of balanceIncome) {
      if (item.income) {
        inc = inc + item.income;
        setIncomeList((pre: ValueCurrencyDashboard[]) => [...pre, item]);
      }
    }

    setNetIncome(salaryAndNetIncome.netIncome);
    setSalaryDuty(salaryAndNetIncome.salary);
    setSalaryDutyList(salaryAndNetIncome.salaryDutyList);
    setIetIncomeList(salaryAndNetIncome.netIncomeList);
    setProjectList(salaryAndNetIncome.balanceList);
    setSalaryPaidOut(salary);
    setExpenditure(expand);
    setIncome(inc);
  };

  const getCurrencies = async () => {
    if (!user.id) return;
    await get({ userId: Number(user.id) });
    setReloadCurrencies.off();
    setReloadAccounting.off();
  };

  useEffect(() => {
    void getCurrencies();
  }, []);

  useEffect(() => {
    if (reloadCurrencies) void getCurrencies();
    if (reloadAccounting) void getCurrencies();
  }, [reloadCurrencies, reloadAccounting]);

  useEffect(() => {
    if (data?.expenditure) {
      if (data.expenditure?.length > 0) handlerDashboard();
    }

    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
  }, [data, error]);

  const reload = useCallback(async (): Promise<void> => {
    await getCurrencies();
  }, [data, isLoading, error, reloadCurrencies, reloadAccounting]);

  const payload = useMemo(() => {
    // console.dir(data);
    return {
      reload,
      reset,
      data,
      error,
      isLoading,
      salaryPaidOut,
      expenditure,
      salaryDuty,
      netIncome,
      projectList,
      netIncomeList,
      salaryDutyList,
      expenditureList,
      salaryPaidOutList,
      incomeList,
      income,
    };
  }, [
    salaryDuty,
    netIncome,
    data,
    error,
    projectList,
    isLoading,
    reloadCurrencies,
    reloadAccounting,
    salaryPaidOut,
    expenditure,
    expenditureList,
    salaryPaidOutList,
    netIncomeList,
    salaryDutyList,
    incomeList,
    income,
  ]);

  return payload;
};
