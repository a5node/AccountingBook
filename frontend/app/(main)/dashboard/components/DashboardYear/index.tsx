'use client';
import React, { MouseEvent, useRef } from 'react';

import type { ChartOptions, InteractionItem } from 'chart.js';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from 'react-chartjs-2';
import { DateFns } from '@lib/DateFns';
import { ChartHelper } from '@lib/ChartHelper';
import { Props } from './props';
import { HelperCurrenciesList } from '@hooks/hooks';

ChartJS.register(
  LineController,
  LineElement,
  LinearScale,
  BarController,
  BarElement,
  CategoryScale,
  PointElement,
  Legend,
  Tooltip,
);

export const DashboardYear: React.FC<Props> = ({
  projectList,
  netIncomeList,
  salaryDutyList,
  expenditureList,
  salaryPaidOutList,
  salaryPaidOut,
  expenditure,
  netIncome,
  salaryDuty,
  income,
  incomeList,
}): JSX.Element => {
  const dateFns = new DateFns();
  const helper = new HelperCurrenciesList();
  const chartRef = useRef<ChartJS>(null);
  const labels = dateFns.getMonths();
  const chartHelper = new ChartHelper(labels);
  const options: ChartOptions = chartHelper.options(`Accounting per ${new Date().getFullYear()} year`);

  const data = chartHelper
    .addDatasetLine(
      label => {
        const value: number = helper.sortBalance(label, netIncomeList);
        return value;
      },
      `Net income ${netIncome}`,
      'rgb(255, 99, 132)',
    )
    .addDatasetLine(
      label => {
        const value: number = helper.sortBalance(label, incomeList);
        return value;
      },
      `Balance ${income}`,
      'rgb(100, 99, 255)',
    )
    .addDatasetBar(
      label => {
        const value: number = helper.sortBalance(label, projectList);
        return value;
      },
      `Project ${income}`,
      'rgb(33, 55, 192)',
    )
    .addDatasetBar(
      label => {
        const value: number = helper.sortBalance(label, salaryDutyList);
        return value;
      },
      `Salary Duty ${salaryDuty}`,
      'rgb(55, 77, 133)',
    )
    .addDatasetBar(
      label => {
        const value: number = helper.sortBalance(label, salaryPaidOutList);
        return -value;
      },
      `Salary paid out: ${salaryPaidOut}`,
      'rgb(75, 192, 192)',
    )
    .addDatasetBar(
      label => {
        const value: number = helper.sortBalance(label, expenditureList);
        return -value;
      },
      `Expenditure ${expenditure}`,
      'rgb(53, 162, 235)',
    )
    .data();

  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;
  };

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return;
  };

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;
    if (!chart) return;
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  return (
    <Chart width={'100%'} height={'50%'} ref={chartRef} type="bar" onClick={onClick} options={options} data={data} />
  );
};
