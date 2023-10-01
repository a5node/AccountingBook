'use client';
import { useCallback, useState } from 'react';

import { TGetCurrencyByIdQueryReq, TGetCurrencyByIdQueryRes, ReqError } from '@interface/contracts.types';

export const useGetCurrencyById = (): {
  data: TGetCurrencyByIdQueryRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TGetCurrencyByIdQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TGetCurrencyByIdQueryRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TGetCurrencyByIdQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.currency?.getCurrencyById(req);
          if ('id' in res) setData(res);
          else setError(res);
        }
      } catch (error) {
        setError(new Error('Something went wrong!'));
      }
      setIsLoading(false);
    },
    [data, isLoading, error],
  );

  const reset = useCallback((): void => {
    setData(null);
    setError(null);
  }, [data, error]);

  return { data, error, isLoading, get, reset };
};
