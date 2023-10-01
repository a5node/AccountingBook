'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Props } from './props';
import { ChartHelper } from '@lib/ChartHelper';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieCurrencies: React.FC<Props> = ({ currencies }): JSX.Element => {
  const labels: string[] = [];
  const valueData: number[] = [];
  const backgroundColor: string[] = [];
  const borderColor: string[] = [];

  const helper = new ChartHelper(labels);

  for (const currency of currencies) {
    labels.push(currency.shortName);
    valueData.push(currency.balance);
    const color1 = helper.getRandomRgb();
    const color2 = helper.getRandomRgb();
    backgroundColor.push(color1);
    borderColor.push(color2);
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Currencies',
        data: valueData,
        backgroundColor,
        borderColor,
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
