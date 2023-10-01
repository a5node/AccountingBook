'use client';
import { useCallback, useState, useEffect } from 'react';

import { IGetUserByIdReq, IGetUserByIdRes, ReqError } from '@interface/contracts.types';

export const useGetUserById = (
  id: IGetUserByIdReq['id'],
): {
  user: IGetUserByIdRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  getUser: (data: IGetUserByIdReq['id']) => Promise<void>;
  reset: () => void;
} => {
  const [user, setUser] = useState<IGetUserByIdRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const getUser = useCallback(async (data: IGetUserByIdReq['id'] = id): Promise<void> => {
    try {
      if (window) {
        setIsLoading(true);
        setError(null);
        const res = await window.api?.database?.user?.getUserById({ id: data });
        if ('id' in res) setUser(res);
        else setError(res);
      }
    } catch (error) {
      setError(new Error('Something went wrong!'));
    }
    setIsLoading(false);
  }, []);

  const reset = useCallback((): void => {
    setUser(null);
    setError(null);
  }, [user, error]);

  useEffect(() => {
    if (id) void getUser(id);
  }, []);

  return { user, error, isLoading, getUser, reset };
};
