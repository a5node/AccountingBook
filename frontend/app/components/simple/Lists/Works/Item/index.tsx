'use client';
import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { HiOutlineTrash } from 'react-icons/hi2';

import { ItemProps } from './props';
import { DateFns } from '@lib/DateFns';

import { BtnIcon } from '@app/components';
import { DrawerUpdateWork } from '../DrawerUpdateWork';

// https://chakra-ui.com/docs/components/accordion
export const ItemWork: React.FC<ItemProps> = ({ work, remove }): JSX.Element => {
  const { position, hours, rate, positionName, start, end, isWork } = work;
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
            {dateFns.format(start)} {dateFns.format(end)}
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
        <Text fontSize="lg">Working:{isWork ? 'yes' : 'no'}</Text>
        {positionName && <Text fontSize="lg">Position name:{positionName}</Text>}
        {position && <Text fontSize="lg">Position:{position}</Text>}
        {hours && <Text fontSize="lg">Hours:{hours}</Text>}
        {rate && <Text fontSize="lg">Rate:{rate}</Text>}
        <Divider margin={'0.6rem 0'} />
        <Flex>
          <BtnIcon
            width="30px"
            height="30px"
            fontSize="20px"
            aria-label="delete"
            icon={<HiOutlineTrash />}
            onClick={() => remove(work.id)}
          />
          <DrawerUpdateWork work={work} />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
