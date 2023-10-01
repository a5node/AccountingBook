'use client';
import { useCallback, useState } from 'react';

import { TFindIncomesQueryRes, TFindIncomesQueryReq, ReqError } from '@interface/contracts.types';

export const useFindIncomes = (): {
  data: TFindIncomesQueryRes[];
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TFindIncomesQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TFindIncomesQueryRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TFindIncomesQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.income?.findIncomes(req);
          if (Array.isArray(res)) setData(res);
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
    setData([]);
    setError(null);
  }, [data, error]);

  return { data, error, isLoading, get, reset };
};
