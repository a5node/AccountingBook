'use client';
import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react';

import { DashboardYear } from '../DashboardYear';
import { useAccounting } from '@hooks/hooks';
import { PieFirst } from '../PieFirst';
import { PieCurrencies } from '../PieCurrencies';
import { Indicator } from '@app/components';

export const DashboardPage: React.FC = (): JSX.Element => {
  const {
    salaryPaidOut,
    expenditure,
    netIncome,
    salaryDuty,
    projectList,
    netIncomeList,
    salaryDutyList,
    expenditureList,
    salaryPaidOutList,
    income,
    incomeList,
    data,
  } = useAccounting({
    from: new Date(new Date().getFullYear() - 1, 1, 1),
    to: new Date(new Date().getFullYear(), 12, 31),
  });
  if (data === null) return <Indicator loadingItem />;
  return (
    <Tabs position="relative" variant="enclosed" width={'100%'}>
      <TabList>
        <Tab>Year</Tab>
        <Tab>Base</Tab>
        <Tab>Currency</Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
      <TabPanels>
        <TabPanel minWidth={'85vw'} minHeight={'80vh'} position={'relative'} margin={'0 auto'}>
          <DashboardYear
            salaryPaidOutList={salaryPaidOutList}
            expenditureList={expenditureList}
            salaryPaidOut={salaryPaidOut}
            expenditure={expenditure}
            netIncome={netIncome}
            salaryDuty={salaryDuty}
            projectList={projectList}
            netIncomeList={netIncomeList}
            salaryDutyList={salaryDutyList}
            incomeList={incomeList}
            income={income}
          />
        </TabPanel>
        <TabPanel minWidth={'85vw'} minHeight={'80vh'} position={'relative'} margin={'0 auto'}>
          <PieFirst
            salaryPaidOut={salaryPaidOut}
            expenditure={expenditure}
            netIncome={netIncome}
            salaryDuty={salaryDuty}
            income={income}
          />
        </TabPanel>
        <TabPanel minWidth={'85vw'} minHeight={'80vh'} position={'relative'} margin={'0 auto'}>
          <PieCurrencies currencies={data.currencies} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
