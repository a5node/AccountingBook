'use client';
// https://docs.pmnd.rs/zustand/guides/initialize-state-with-props
import { PropsWithChildren, createContext, useContext, useMemo, useState, Dispatch, SetStateAction } from 'react';

import { useUsersStore, UsersState } from '@store/users';

export interface IUsersContext extends UsersState {
  candidate: number | null;
  employee: number | null;
  person: number | null;
  setPerson: Dispatch<SetStateAction<number | null>>;
  setCandidate: Dispatch<SetStateAction<number | null>>;
  setEmployee: Dispatch<SetStateAction<number | null>>;
}

export const UsersContext = createContext<IUsersContext | null>(null);

export const useUsersContext = (): IUsersContext => {
  const store = useContext<IUsersContext | null>(UsersContext);
  if (!store) throw new Error('Missing UserContext.Provider in the tree');
  return store;
};

export const UsersProvider = ({ children, ...props }: PropsWithChildren): JSX.Element => {
  const { users, addUsers } = useUsersStore(props);

  const [candidate, setCandidate] = useState<number | null>(null);
  const [employee, setEmployee] = useState<number | null>(null);
  const [person, setPerson] = useState<number | null>(null);

  const memoValue = useMemo(() => {
    return { users, candidate, employee, person, addUsers, setCandidate, setEmployee, setPerson };
  }, [users, candidate, employee, person]);

  return <UsersContext.Provider value={memoValue}>{children}</UsersContext.Provider>;
};
