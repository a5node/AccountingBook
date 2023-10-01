'use client';
import { useCallback, useState } from 'react';

import { TCreateRoleCommandReq, TCreateRoleCommandRes, ReqError } from '@interface/contracts.types';

export const useCreateRole = (): {
  data: TCreateRoleCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  create: (req: TCreateRoleCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TCreateRoleCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const create = useCallback(
    async (req: TCreateRoleCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.roles?.create(req);
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

  return { data, error, isLoading, create, reset };
};
