'use client';
import React from 'react';

import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';

import { ItemProps } from './props';

export const ItemBank: React.FC<ItemProps> = ({ bank }): JSX.Element => {
  const { card, bankname, iban, linkpay } = bank;

  return (
    <AccordionItem
      width={'100%'}
      boxShadow={'0px 1px 3px -1px rgba(0,0,0,0.82)'}
      border={'1px solid'}
      borderColor={'blackAlpha.200'}
      borderRadius={'5px'}
    >
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {bankname}
          </Box>
          <AccordionIcon />
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
        {card && <Text fontSize="lg">Card:{card}</Text>}
        {iban && <Text fontSize="lg">IBAN:{iban}</Text>}
        {linkpay && <Text fontSize="lg">Link pay:{linkpay}</Text>}
      </AccordionPanel>
    </AccordionItem>
  );
};
