'use client';
import { useCallback, useState } from 'react';

import { TGetExpenditureByIdQueryReq, TGetExpenditureByIdQueryRes, ReqError } from '@interface/contracts.types';

export const useGetExpenditureById = (): {
  data: TGetExpenditureByIdQueryRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TGetExpenditureByIdQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TGetExpenditureByIdQueryRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TGetExpenditureByIdQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.expenditure?.getExpenditureById(req);
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
