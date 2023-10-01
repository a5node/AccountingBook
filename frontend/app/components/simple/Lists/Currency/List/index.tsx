'use client';
import React, { useEffect } from 'react';

import { Accordion, useToast } from '@chakra-ui/react';
import { useToggleStore } from '@store/toggles';

import { Props } from './props';
import { ItemCurrency } from '../Item';
import { useDeleteCurrency, useFindCurrencys } from '@hooks/currency';
import { useUserContext } from '@app/contexts';

export const ListCurrencies: React.FC<Props> = (): JSX.Element => {
  const toast = useToast();
  const { user } = useUserContext();

  const {
    setReloadCurrencies,
    setReloadAccounting,
    toggles: { reloadCurrencies, reloadAccounting },
  } = useToggleStore();
  const { data, remove, error } = useDeleteCurrency();
  const getCurrencies = useFindCurrencys();

  const getListCurrencies = () => {
    if (!user.id) return;
    getCurrencies.get({ AND: [{ accounting: { userId: Number(user.id) } }] });
    setReloadCurrencies.off();
    setReloadAccounting.off();
  };

  useEffect(() => {
    if (user.id) getListCurrencies();
  }, []);

  useEffect(() => {
    if (data) getListCurrencies();
    if (reloadCurrencies) getListCurrencies();
    if (reloadAccounting) getListCurrencies();
  }, [data, reloadCurrencies, reloadAccounting]);

  const removeHandler = (id: number): void => {
    setReloadAccounting.on();
    setReloadCurrencies.on();
    remove({ id });
  };

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (data) toast({ title: 'Currency remove.', status: 'success', duration: 1000, isClosable: true });
  }, [error, data]);

  return (
    <Accordion width={'full'} allowToggle>
      {getCurrencies?.data?.map(({ id, ...data }) => {
        return <ItemCurrency key={id} currency={{ id, ...data }} remove={removeHandler} />;
      })}
    </Accordion>
  );
};
