'use client';
import { useCallback, useEffect, useMemo } from 'react';
import { useToast } from '@chakra-ui/react';

import { ReqError, TFindCurrencysQueryRes } from '@interface/contracts.types';
import { useUserContext } from '@app/contexts';
import { useToggleStore } from '@store/toggles';
import { useFindCurrencys } from '../currency';

export const useCurrenciesList = (): {
  data: TFindCurrencysQueryRes[];
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  reload: () => Promise<void>;
  reset: () => void;
} => {
  const toast = useToast();
  const { user } = useUserContext();
  const { data, error, isLoading, get, reset } = useFindCurrencys();
  const {
    setReloadCurrencies,
    setReloadAccounting,
    toggles: { reloadCurrencies, reloadAccounting },
  } = useToggleStore();

  const getCurrencies = useCallback(async () => {
    if (!user.id) return;
    await get({
      AND: [
        {
          accounting: { userId: Number(user.id) },
        },
      ],
    });

    setReloadCurrencies.off();
    setReloadAccounting.off();
  }, [reloadCurrencies, reloadAccounting, data, error]);

  useEffect(() => {
    void getCurrencies();
  }, []);

  useEffect(() => {
    if (reloadCurrencies) void getCurrencies();
    if (reloadAccounting) void getCurrencies();
  }, [reloadCurrencies, reloadAccounting]);

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
  }, [data, error]);

  const reload = useCallback(async (): Promise<void> => {
    await getCurrencies();
  }, [data, isLoading, error, reloadCurrencies, reloadAccounting]);

  const payload = useMemo(() => {
    return { data, error, isLoading, reload, reset };
  }, [data, error, isLoading, reloadCurrencies, reloadAccounting]);

  return payload;
};
