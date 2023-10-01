'use client';
import { useCallback, useState } from 'react';

import { TAddWorkCommandReq, TAddWorkCommandRes, ReqError } from '@interface/contracts.types';

export const useAddWork = (): {
  data: TAddWorkCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  add: (req: TAddWorkCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TAddWorkCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const add = useCallback(
    async (req: TAddWorkCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.work?.addWork(req);
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
