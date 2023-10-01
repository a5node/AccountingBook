'use client';
import React from 'react';
import { Props } from './props';
import { Flex, Text } from '@chakra-ui/react';

export const PaymentEmployeeCard: React.FC<Props> = ({ payment }): JSX.Element => {
  return (
    <Flex flexDirection={'column'} width={'100%'} gap={'0.3rem'}>
      <Text fontSize="lg">Salary now: {payment?.salary}</Text>
      <Text fontSize="lg">Paid leave now: {payment?.paidLeave}</Text>
      <Text fontSize="lg">Bonus now: {payment?.bonus}</Text>
      <Text fontSize="lg">Paid now: {payment?.paid}</Text>
      <Text fontSize="lg">Paid out now:{payment?.toPayoff}</Text>
      <Text fontSize="lg">Duty now: {payment?.duty}</Text>
    </Flex>
  );
};
