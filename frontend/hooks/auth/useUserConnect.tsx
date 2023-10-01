'use client';
import { useCallback, useState, useEffect } from 'react';

import { ReqError } from '../../../contracts/types';
import { useSessionContext, useUserContext } from '@app/contexts';

export interface TUserConnectReq {
  name: string;
  password: string;
  email: string;
}

export const useUserConnect = (): {
  isAuth: boolean;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  connect: () => Promise<void>;
  reset: () => void;
} => {
  const { session, addTokens } = useSessionContext();
  const { addUser, addRole } = useUserContext();

  const [isAuth, setAuth] = useState<boolean>(false);

  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fn = async (): Promise<void> => {
    setLoading(true);
    if (session === null) return setLoading(false);
    const { user } = session;
    if (!user) return setLoading(false);

    const payload = {
      name: user.name || '',
      password: user.password || '',
      email: user.email || '',
    };
    try {
      if (payload.password) {
        const res = await window?.api?.database?.auth.signIn(payload);
        if (res && 'id' in res) {
          addUser(res);
          addTokens(res);

          addRole(res.roles);
          setAuth(true);
        } else {
          setError(res);
        }
      }
    } catch {
      setError(new Error('Something went wrong!'));
    }

    setLoading(false);
  };

  const connect = useCallback(async (): Promise<void> => {
    await fn();
  }, [isAuth, error]);

  const reset = useCallback((): void => {
    setAuth(false);
    setError(null);
  }, [isAuth, error]);

  useEffect((): void => {
    if (session?.user?.password) void fn();
  }, [session]);

  return { isAuth, error, isLoading, connect, reset };
};
