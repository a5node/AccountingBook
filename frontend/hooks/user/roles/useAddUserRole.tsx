'use client';
import { useCallback, useState } from 'react';

import { TAddUserRoleCommandReq, TAddUserRoleCommandRes, ReqError } from '@interface/contracts.types';

export const useAddUserRole = (): {
  data: TAddUserRoleCommandRes['success'] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  add: (req: TAddUserRoleCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TAddUserRoleCommandRes['success'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const add = useCallback(
    async (req: TAddUserRoleCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.roles?.addUserRole(req);
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

  return { data, error, isLoading, add, reset };
};
