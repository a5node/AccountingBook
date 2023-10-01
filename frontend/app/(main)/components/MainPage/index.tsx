'use client';
import React, { useState } from 'react';
import { FormControl, FormLabel, Grid, GridItem, Input, Flex } from '@chakra-ui/react';
import { DateFns } from '@lib/DateFns';
import * as styles from './styles';

import { H, ListIncomes, ListExpenditures } from '@app/components';

export const MainPage: React.FC = (): JSX.Element => {
  const dataFns = new DateFns();
  const valFrom = 100 * 24 * 60 * 60 * 1000;
  const valTo = 24 * 60 * 60 * 1000;
  const baseFrom = Date.now() - valFrom;
  const baseToo = Date.now() + valTo;
  const [from, setFrom] = useState<string>(dataFns.format2(baseFrom));
  const [to, setTo] = useState<string>(dataFns.format2(baseToo));

  return (
    <Grid {...styles.wrap}>
      <GridItem {...styles.from}>
        <FormControl width={'full'}>
          <Flex flexDirection={'row'} width={'full'} alignItems={'center'}>
            <FormLabel width={'150px'} size={'1.2rem'}>
              Select from:
            </FormLabel>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFrom(e.target.value);
              }}
              type="date"
              placeholder="Enter date when from"
            />
          </Flex>
        </FormControl>
      </GridItem>
      <GridItem {...styles.to}>
        <FormControl width={'full'}>
          <Flex flexDirection={'row'} width={'full'} alignItems={'center'}>
            <FormLabel width={'150px'} size={'1.2rem'}>
              Select to:
            </FormLabel>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTo(e.target.value);
              }}
              type="date"
              placeholder="Enter date when to"
            />
          </Flex>
        </FormControl>
      </GridItem>
      <GridItem {...styles.base}>
        <H as={'h4'} size={'1rem'}>
          Income
        </H>
        <ListIncomes from={from} to={to} />
      </GridItem>
      <GridItem {...styles.currencies}>
        <H as={'h4'} size={'1rem'}>
          Expenditure
        </H>
        <ListExpenditures from={from} to={to} />
      </GridItem>
    </Grid>
  );
};
