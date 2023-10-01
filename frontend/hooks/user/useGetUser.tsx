'use client';
import { useCallback, useState } from 'react';

import { IGetUserReq, IGetUserRes, ReqError } from '@interface/contracts.types';

export const useGetUser = (): {
  user: IGetUserRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  getUser: (data: IGetUserReq) => Promise<void>;
  reset: () => void;
} => {
  const [user, setUser] = useState<IGetUserRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const getUser = useCallback(
    async (data: IGetUserReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.user?.find(data);
          if ('id' in res) setUser(res);
          else setError(res);
        }
      } catch (error) {
        setError(new Error('Something went wrong!'));
      }
      setIsLoading(false);
    },
    [user, isLoading, error],
  );

  const reset = useCallback((): void => {
    setUser(null);
    setError(null);
  }, [user, error]);

  return { user, error, isLoading, getUser, reset };
};
