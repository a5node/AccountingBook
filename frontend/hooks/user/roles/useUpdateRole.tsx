'use client';
import { useCallback, useState } from 'react';

import { TUpdateRolesCommandReq, TUpdateRolesCommandRes, ReqError } from '@interface/contracts.types';

export const useUpdateRole = (): {
  data: TUpdateRolesCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  update: (req: TUpdateRolesCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TUpdateRolesCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const update = useCallback(
    async (req: TUpdateRolesCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.roles?.update(req);
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

  return { data, error, isLoading, update, reset };
};
