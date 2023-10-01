'use client';
import { useCallback, useState } from 'react';

import { IAddUserReq, IAddUserRes, ReqError } from '@interface/contracts.types';

export const useAddUser = (): {
  user: IAddUserRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  addUser: (data: IAddUserReq) => Promise<void>;
  reset: () => void;
} => {
  const [user, setUser] = useState<IAddUserRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const addUser = useCallback(async (req: IAddUserReq): Promise<void> => {
    if (!req) return;
    try {
      if (window) {
        setIsLoading(true);
        setError(null);
        const res = await window.api?.database?.user.addUser(req);
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

  return { user, error, isLoading, addUser, reset };
};
