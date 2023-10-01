'use client';
import React from 'react';

import { Accordion } from '@chakra-ui/react';

import { Props } from './props';
import { ItemHireDate } from '../Item';

export const ListHireDate: React.FC<Props> = ({ hireDates }): JSX.Element => {
  return (
    <Accordion width={'full'} allowToggle>
      {hireDates?.map(({ id, ...data }) => {
        return <ItemHireDate key={id} {...data} />;
      })}
    </Accordion>
  );
};
