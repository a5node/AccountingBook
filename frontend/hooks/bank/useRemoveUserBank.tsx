'use client';
import { useCallback, useState } from 'react';

import { TRemoveUserBankCommandReq, TRemoveUserBankCommandRes, ReqError } from '@interface/contracts.types';

export const useRemoveUserBank = (): {
  data: TRemoveUserBankCommandRes['success'] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  remove: (req: TRemoveUserBankCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TRemoveUserBankCommandRes['success'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const remove = useCallback(
    async (req: TRemoveUserBankCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.bank?.removeUserBank(req);
          if ('success' in res) setData(res.success);
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

  return { data, error, isLoading, remove, reset };
};
