'use client';
import React, { createContext, PropsWithChildren, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { User } from '@interface/auth.interface';

import { SessionStore, useSessionStore, Actions } from '@store/session';
import { LocalState, useLocalStore } from '@store/local';

type SessionRouterInstance = ReturnType<typeof useRouter>;
type SignInCallback = Parameters<SessionRouterInstance['push']>[0];
type SingInOpt = { callback: SignInCallback; type?: 'signin' | 'signup' };

export interface ISessionContext extends Pick<Actions, 'addUser' | 'addTokens'> {
  isLoading: boolean;
  local: LocalState;
  session: SessionStore | null;
  signOut: () => void;
  signIn: (opt?: SingInOpt, data?: User) => void;
}

export const SessionContext = createContext<ISessionContext | null>(null);

export const useSessionContext = (): ISessionContext => {
  const store = useContext<ISessionContext | null>(SessionContext);
  if (!store) throw new Error('Missing UserContext.Provider in the tree');
  return store;
};

export const SessionProvider = ({ children }: PropsWithChildren): React.JSX.Element => {
  const router = useRouter();
  const { session, reset, createSession, addUser, addTokens } = useSessionStore();
  const local = useLocalStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect((): void => {
    if (session?.sessionToken) local.addToken(session?.sessionToken);
  }, [session?.sessionToken]);

  const signOut = useCallback((): void => {
    setIsLoading(true);
    reset();
    setIsLoading(false);
    router.push('/signin');
  }, [session]);

  const signIn = async (opt?: SingInOpt, data?: User | null): Promise<void> => {
    setIsLoading(true);
    const { type, callback }: SingInOpt = {
      callback: '/signin',
      type: 'signin',
      ...opt,
    };

    if (data) {
      if (type === 'signin') createSession(data);
      else if (type === 'signup') addUser(data);
    }
    setIsLoading(false);
    router.push(callback);
  };

  const memoValue = useMemo((): ISessionContext => {
    return { isLoading, session, signOut, signIn, addUser, addTokens, local };
  }, [isLoading, session, local]);

  return <SessionContext.Provider value={memoValue}>{children}</SessionContext.Provider>;
};
