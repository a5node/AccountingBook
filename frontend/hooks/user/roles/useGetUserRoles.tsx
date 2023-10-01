'use client';
import { useCallback, useState } from 'react';

import { TGetUserRolesQueryReq, TGetUserRolesQueryRes, ReqError } from '@interface/contracts.types';

export const useGetUserRoles = (): {
  data: TGetUserRolesQueryRes[] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TGetUserRolesQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TGetUserRolesQueryRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TGetUserRolesQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.roles?.getUserRoles(req);
          if (Array.isArray(res)) setData(res);
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
