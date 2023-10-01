'use client';
import { useCallback, useState } from 'react';
import type { Profile } from '@prisma/client';

import { IUpdateUserByIdReq, IUpdateUserByIdRes, ReqError } from '@interface/contracts.types';

export const useUpdateUserById = (
  id: IUpdateUserByIdReq['id'],
): {
  user: IUpdateUserByIdRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  updateUser: (data: Partial<Omit<IUpdateUserByIdReq, 'id'>>) => Promise<void>;
  updateUserProfile: (data: Partial<Omit<Profile, 'id' | 'userId'>>) => Promise<void>;
  updateUserEmployee: (role: string, employee: IUpdateUserByIdReq['employee']) => Promise<void>;

  reset: () => void;
} => {
  const [user, setUser] = useState<IUpdateUserByIdRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const updateUser = useCallback(async (data: Partial<Omit<IUpdateUserByIdReq, 'id'>>): Promise<void> => {
    if (!data) return;
    try {
      if (window) {
        setIsLoading(true);
        setError(null);
        const res = await window.api?.database?.user?.update({ id, ...data });
        if ('id' in res) setUser(res);
        else setError(res);
      }
    } catch (error) {
      setError(new Error('Something went wrong!'));
    }
    setIsLoading(false);
  }, []);

  const updateUserProfile = useCallback(async (profile: Partial<Omit<Profile, 'id' | 'userId'>>): Promise<void> => {
    if (!profile) return;
    try {
      if (window) {
        setIsLoading(true);
        setError(null);
        const res = await window.api?.database?.user.update({
          id,
          profile,
        });
        if ('id' in res) setUser(res);
        else setError(res);
      }
    } catch (error) {
      setError(new Error('Something went wrong!'));
    }
    setIsLoading(false);
  }, []);

  const updateUserEmployee = useCallback(
    async (role: string, employee: IUpdateUserByIdReq['employee']): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.user.update({
            id,
            role,
            employee,
          });
          if ('id' in res) setUser(res);
          else setError(res);
        }
      } catch (error) {
        setError(new Error('Something went wrong!'));
      }
      setIsLoading(false);
    },
    [],
  );

  const reset = useCallback((): void => {
    setUser(null);
    setError(null);
  }, [user, error]);

  return {
    user,
    error,
    isLoading,
    updateUser,
    updateUserProfile,
    updateUserEmployee,
    reset,
  };
};
