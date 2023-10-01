'use client';
import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Flex } from '@chakra-ui/react';

import { ItemProps } from './props';
import { BtnIcon, H } from '@app/components';
import { DrawerUpdateCurrency } from '../DrawerUpdateCurrency';

export const ItemCurrency: React.FC<ItemProps> = ({ currency, remove }): JSX.Element => {
  const { shortName, name, balance } = currency;

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
            Balance: {balance}
          </H>
          <H as="span" size={'0.7rem'}>
            {name}
          </H>
          <H as="span" size={'0.7rem'}>
            {shortName}
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
        <Flex>
          <BtnIcon
            width="30px"
            height="30px"
            fontSize="20px"
            aria-label="delete"
            icon={<HiOutlineTrash />}
            onClick={() => remove(currency.id)}
          />
          <DrawerUpdateCurrency currency={currency} />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
