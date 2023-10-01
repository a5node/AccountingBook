'use client';
import { useCallback, useState } from 'react';

import { IGetUsersReq, IGetUsersRes, ReqError } from '@interface/contracts.types';

export const useGetUsers = (): {
  users: IGetUsersRes[];
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  getUsers: (data: IGetUsersReq) => Promise<void>;
  reset: () => void;
} => {
  const [users, setUsers] = useState<IGetUsersRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const getUsers = useCallback(
    async (data: IGetUsersReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.user?.findUsers(data);
          if (Array.isArray(res)) setUsers(res);
          else setError(res);
        }
      } catch (error) {
        setError(new Error('Something went wrong!'));
      }
      setIsLoading(false);
    },
    [users, isLoading, error],
  );

  const reset = useCallback((): void => {
    setUsers([]);
    setError(null);
  }, [users, error]);

  return { users, error, isLoading, getUsers, reset };
};
