'use client';
import { useCallback, useState } from 'react';

import { TRemoveUserRoleCommandReq, TRemoveUserRoleCommandRes, ReqError } from '@interface/contracts.types';

export const useRemoveUserRole = (): {
  data: TRemoveUserRoleCommandRes['success'] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  remove: (req: TRemoveUserRoleCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TRemoveUserRoleCommandRes['success'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const remove = useCallback(
    async (req: TRemoveUserRoleCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.roles?.removeUserRole(req);
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
