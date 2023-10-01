'use client';
import { useCallback, useState } from 'react';

import { TAddIncomeCommandReq, TAddIncomeCommandRes, ReqError } from '@interface/contracts.types';

export const useAddIncome = (): {
  data: TAddIncomeCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  add: (req: TAddIncomeCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TAddIncomeCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const add = useCallback(
    async (req: TAddIncomeCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.income?.addIncome(req);
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

  return { data, error, isLoading, add, reset };
};
