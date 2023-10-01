'use client';
import React from 'react';

import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Divider, Flex, Text } from '@chakra-ui/react';

import { DateFns } from '@lib/DateFns';
import { ItemProps } from './props';
import { H } from '@app/components';
import { DrawerUpdateExp } from '../DrawerUpdateExp';

export const ItemExpenditure: React.FC<ItemProps> = ({ expenditure }): JSX.Element => {
  const dataFns = new DateFns();
  const { description, value, isRefund, createAt, refundAt, currencyName } = expenditure;

  return (
    <AccordionItem
      width={'100%'}
      boxShadow={'0px 1px 3px -1px rgba(0,0,0,0.82)'}
      border={'1px solid'}
      borderColor={'blackAlpha.200'}
      borderRadius={'5px'}
    >
      <h2>
        <AccordionButton width={'full'} display={'flex'} flexDirection={'row'} gap={'1rem'}>
          <H as="span" size={'0.7rem'}>
            {currencyName}: {value}
          </H>

          <AccordionIcon marginLeft={'auto'} />
        </AccordionButton>
      </h2>
      <AccordionPanel
        pb={4}
        bg={'gray.700'}
        boxShadow={'0px 1px 3px -1px rgba(0,0,0,0.82)'}
        border={'1px solid'}
        borderColor={'blackAlpha.200'}
        borderRadius={'5px'}
      >
        <Text fontSize="lg" size={'0.5rem'}>
          Added date: {dataFns.format(createAt)}
        </Text>
        {refundAt && (
          <Text fontSize="lg" size={'0.5rem'}>
            Is refund: {isRefund}
          </Text>
        )}
        {refundAt && (
          <Text fontSize="lg" size={'0.5rem'}>
            Refund date: {dataFns.format(refundAt)}
          </Text>
        )}
        <Text fontSize="lg" size={'0.5rem'}>
          Description: {description}
        </Text>
        <Divider />
        <Flex>
          <DrawerUpdateExp expenditure={expenditure} />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
