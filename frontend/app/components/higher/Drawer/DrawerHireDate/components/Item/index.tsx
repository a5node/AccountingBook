'use client';
import React from 'react';

import { ListItem, Text } from '@chakra-ui/react';

import { ItemProps } from './props';
import { DateFns } from '@lib/DateFns';

export const Item: React.FC<ItemProps> = ({ commit, hired, fired }): JSX.Element => {
  const dateFns = new DateFns();

  return (
    <ListItem
      display={'grid'}
      width={'100%'}
      gridTemplateColumns={'1fr'}
      gridTemplateRows={'30px 1fr'}
      columnGap={'0.5rem'}
      justifyContent={'start'}
      alignItems={'center'}
      boxShadow={'0px 1px 3px -1px rgba(0,0,0,0.82)'}
      border={'1px solid'}
      borderColor={'blackAlpha.200'}
      borderRadius={'5px'}
    >
      <Text fontSize="lg">
        {dateFns.format(hired)}/{dateFns.format(fired)}
      </Text>
      <Text fontSize="lg">{commit}</Text>
    </ListItem>
  );
};
