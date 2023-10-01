'use client';
import React, { useEffect } from 'react';

import { Accordion } from '@chakra-ui/react';
import { useToggleStore } from '@store/toggles';

import { Props } from './props';
import { ItemIncome } from '../Item';

import { useUserContext } from '@app/contexts';
import { useFindIncomes } from '@hooks/income';

export const ListIncomes: React.FC<Props> = ({ from, to }): JSX.Element => {
  const { user } = useUserContext();

  const {
    setReloadIncome,
    toggles: { reloadIncome },
  } = useToggleStore();

  const getIncomes = useFindIncomes();

  const getList = () => {
    if (!user.id) return;
    getIncomes.get({
      //
      createAt: { lte: new Date(to), gte: new Date(from) },
      accounting: { userId: Number(user.id) },
    });
    setReloadIncome.off();
  };

  useEffect(() => {
    if (user.id) getList();
  }, []);

  useEffect(() => {
    if (reloadIncome) getList();
    if (from && to) getList();
    else if (from) getList();
    else if (to) getList();
  }, [reloadIncome, from, to]);

  return (
    <Accordion width={'full'} allowToggle>
      {getIncomes?.data?.map(({ id, ...data }) => {
        return <ItemIncome key={id} income={{ id, ...data }} />;
      })}
    </Accordion>
  );
};
