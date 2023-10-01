'use client';
import React from 'react';

import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';

import { ItemProps } from './props';
import { DateFns } from '@lib/DateFns';

export const ItemHireDate: React.FC<ItemProps> = ({ commit, hired, fired }): JSX.Element => {
  const dateFns = new DateFns();

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
            {dateFns.format(hired)}/{dateFns.format(fired)}
          </Box>
          {commit && <AccordionIcon />}
        </AccordionButton>
      </h2>
      {commit && (
        <AccordionPanel
          pb={4}
          bg={'gray.700'}
          boxShadow={'0px 1px 3px -1px rgba(0,0,0,0.82)'}
          border={'1px solid'}
          borderColor={'blackAlpha.200'}
          borderRadius={'5px'}
        >
          <Text fontSize="lg">{commit}</Text>
        </AccordionPanel>
      )}
    </AccordionItem>
  );
};
