'use client';
import { useCallback, useState } from 'react';

import { TDeleteRolesCommandReq, TDeleteRolesCommandRes, ReqError } from '@interface/contracts.types';

export const useDeleteRoles = (): {
  data: TDeleteRolesCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  remove: (req: TDeleteRolesCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TDeleteRolesCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const remove = useCallback(
    async (req: TDeleteRolesCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.roles?.delete(req);
          if ('role' in res) setData(res);
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
