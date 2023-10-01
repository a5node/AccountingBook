'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Props } from './props';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieFirst: React.FC<Props> = ({
  salaryPaidOut,
  expenditure,
  netIncome,
  salaryDuty,
  income,
}): JSX.Element => {
  const data = {
    labels: ['Net income', 'Salary duty', 'Salary paid out', 'Expenditure', 'Income'],
    datasets: [
      {
        label: 'Accounting',
        data: [netIncome, salaryDuty, salaryPaidOut, expenditure, income],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(222, 56, 101, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(222, 56, 101, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie
      data={data}
      options={{
        plugins: {
          legend: { position: 'right' as const },
        },
      }}
    />
  );
};
