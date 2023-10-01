'use client';
import React from 'react';

import { Accordion } from '@chakra-ui/react';

import { Props } from './props';
import { ItemBank } from '../Item';

export const ListBanks: React.FC<Props> = ({ banks }): JSX.Element => {
  return (
    <Accordion width={'full'} allowToggle>
      {banks?.map(({ id, ...data }) => {
        return <ItemBank key={id} bank={{ id, ...data }} />;
      })}
    </Accordion>
  );
};
