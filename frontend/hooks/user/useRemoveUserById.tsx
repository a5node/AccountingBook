'use client';
import { useCallback, useState } from 'react';

import { IDeleteUserByIdReq, IDeleteUserByIdRes, ReqError } from '@interface/contracts.types';

export const useDeleteUserById = (): {
  user: IDeleteUserByIdRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  deleteUser: (data: IDeleteUserByIdReq['id']) => Promise<void>;
  reset: () => void;
} => {
  const [user, setUser] = useState<IDeleteUserByIdRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const deleteUser = useCallback(async (data: IDeleteUserByIdReq['id']): Promise<void> => {
    try {
      if (window) {
        setIsLoading(true);
        setError(null);
        const res = await window.api?.database?.user.delete({ id: data });
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

  return { user, error, isLoading, deleteUser, reset };
};
