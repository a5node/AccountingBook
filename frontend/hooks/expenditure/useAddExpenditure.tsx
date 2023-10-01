'use client';
import { useCallback, useState } from 'react';

import { TAddExpenditureCommandReq, TAddExpenditureCommandRes, ReqError } from '@interface/contracts.types';

export const useAddExpenditure = (): {
  data: TAddExpenditureCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  add: (req: TAddExpenditureCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TAddExpenditureCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const add = useCallback(
    async (req: TAddExpenditureCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.expenditure?.addExpenditure(req);
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
