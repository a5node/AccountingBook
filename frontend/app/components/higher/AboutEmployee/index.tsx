'use client';
import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import * as styles from './styles';
import { Props } from './props';
import { H, ListBanks, ListHireDate, ListWork, PaymentEmployeeCard } from '@app/components';
import { DrawerBank, DrawerHireDate, DrawerPaymentEmployee, DrawerWork } from '@app/components';

export const AboutEmployee: React.FC<Props> = ({ employee, roles }): JSX.Element => {
  if (!employee) return <></>;

  const { userId, payment, hireDates, isHired, id, banks, works } = employee;

  const isUser = roles?.find(({ role }) => role === 'USER');

  return (
    <Grid {...styles.about}>
      <GridItem {...styles.payment}>
        {!isUser && payment && <DrawerPaymentEmployee userId={userId} payment={payment} />}
        {!isUser && payment && <PaymentEmployeeCard payment={payment} />}
      </GridItem>
      <GridItem {...styles.work}>
        {isHired && <DrawerWork employee={employee} />}
        {!isHired && !isUser && (
          <H as="p" size={'1rem'} margin={'0 auto'}>
            Works
          </H>
        )}
        {!isUser && <ListWork works={works} />}
      </GridItem>
      <GridItem {...styles.bank}>
        {!isUser && <DrawerBank employeeId={id} />}
        {!isUser && <ListBanks banks={banks} />}
      </GridItem>
      <GridItem {...styles.hireDate}>
        <DrawerHireDate userId={userId} roles={roles} employeeId={id} employeeIsHired={isHired} />
        <ListHireDate hireDates={hireDates} />
      </GridItem>
    </Grid>
  );
};
