'use client';
import { useCallback, useState } from 'react';

import { TGetUserBanksQueryRes, TGetUserBanksQueryReq, ReqError } from '@interface/contracts.types';

export const useGetUserBanks = (): {
  data: TGetUserBanksQueryRes['banks'];
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TGetUserBanksQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TGetUserBanksQueryRes['banks']>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TGetUserBanksQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.bank?.getUserBanks(req);
          if ('banks' in res) setData(res.banks);
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
