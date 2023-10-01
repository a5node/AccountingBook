'use client';
// https://docs.pmnd.rs/zustand/guides/initialize-state-with-props
import { PropsWithChildren, createContext, useContext, useMemo, useEffect, useState } from 'react';

import { UserState, useUserStore } from '@store/user';
import { useSessionContext } from './session.context';

export interface IUserContext extends UserState {
  isLoading: boolean;
  userRole: string | null;
}

export const UserContext = createContext<IUserContext | null>(null);

export const useUserContext = (): IUserContext => {
  const store = useContext<IUserContext | null>(UserContext);
  if (!store) throw new Error('Missing UserContext.Provider in the tree');
  return store;
};

export const UserProvider = ({ children, ...props }: PropsWithChildren): JSX.Element => {
  const { user, addProfile, addRole, addUser } = useUserStore(props);
  const { session, isLoading } = useSessionContext();

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect((): void => {
    if (user.roles?.length) setUserRole(user.roles[0].role);
  }, [user]);

  useEffect((): void => {
    if (session?.user) addUser(session?.user);
  }, [session?.user]);

  const memoValue = useMemo(() => {
    return {
      user,
      isLoading,
      userRole,
      addProfile,
      addRole,
      addUser,
    };
  }, [isLoading, user, userRole]);

  return <UserContext.Provider value={memoValue}>{children}</UserContext.Provider>;
};
