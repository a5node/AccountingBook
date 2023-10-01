'use client';
import { useCallback, useState } from 'react';

import { TFindExpendituresQueryRes, TFindExpendituresQueryReq, ReqError } from '@interface/contracts.types';

export const useFindExpenditures = (): {
  data: TFindExpendituresQueryRes[];
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TFindExpendituresQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TFindExpendituresQueryRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TFindExpendituresQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.expenditure?.findExpenditures(req);
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
