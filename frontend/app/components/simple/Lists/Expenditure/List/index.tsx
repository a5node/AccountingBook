'use client';
import React, { useEffect } from 'react';

import { Accordion } from '@chakra-ui/react';
import { useToggleStore } from '@store/toggles';

import { Props } from './props';
import { ItemExpenditure } from '../Item';
import { useFindExpenditures } from '@hooks/expenditure';
import { useUserContext } from '@app/contexts';

export const ListExpenditures: React.FC<Props> = ({ from, to }): JSX.Element => {
  const { user } = useUserContext();

  const {
    setReloadExp,

    toggles: { reloadExp },
  } = useToggleStore();

  const getExp = useFindExpenditures();

  const getList = () => {
    if (!user.id) return;
    getExp.get({
      //
      createAt: { lte: new Date(to), gte: new Date(from) },
      accounting: { userId: Number(user.id) },
    });
    setReloadExp.off();
  };

  useEffect(() => {
    if (user.id) getList();
  }, []);

  useEffect(() => {
    if (reloadExp) getList();
    if (from && to) getList();
    else if (from) getList();
    else if (to) getList();
  }, [reloadExp, from, to]);

  return (
    <Accordion width={'full'} allowToggle>
      {getExp?.data?.map(({ id, ...data }) => {
        return <ItemExpenditure key={id} expenditure={{ id, ...data }} />;
      })}
    </Accordion>
  );
};
