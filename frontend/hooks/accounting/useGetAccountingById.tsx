'use client';
import { useCallback, useState } from 'react';

import { TGetAccountingByIdQueryReq, TGetAccountingByIdQueryRes, ReqError } from '@interface/contracts.types';

export const useGetAccountingById = (): {
  data: TGetAccountingByIdQueryRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TGetAccountingByIdQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TGetAccountingByIdQueryRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TGetAccountingByIdQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.accounting?.getAccountingById(req);
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
