'use client';
import { useCallback, useState } from 'react';

import { TCreateBankCommandReq, TCreateBankCommandRes, ReqError } from '@interface/contracts.types';

export const useCreateBank = (): {
  data: TCreateBankCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  create: (req: TCreateBankCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TCreateBankCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const create = useCallback(
    async (req: TCreateBankCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.bank?.create(req);
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

  return { data, error, isLoading, create, reset };
};
