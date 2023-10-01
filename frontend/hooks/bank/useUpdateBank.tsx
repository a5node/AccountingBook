'use client';
import { useCallback, useState } from 'react';

import { TUpdateBankCommandReq, TUpdateBankCommandRes, ReqError } from '@interface/contracts.types';

export const useUpdateBank = (): {
  data: TUpdateBankCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  update: (req: TUpdateBankCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TUpdateBankCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const update = useCallback(
    async (req: TUpdateBankCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.bank?.update(req);
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

  return { data, error, isLoading, update, reset };
};
