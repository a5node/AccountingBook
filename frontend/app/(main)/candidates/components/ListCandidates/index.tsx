'use client';
import React, { useEffect } from 'react';
import { List, useToast } from '@chakra-ui/react';
import { useGetUsers } from '@hooks/user';

import { ItemCandidates } from './Item';
import { Indicator } from '@app/components';
import { useUsersContext } from '@app/contexts';
import { useToggleStore } from '@store/toggles';

export const ListCandidates: React.FC = (): JSX.Element => {
  const { addUsers } = useUsersContext();
  const { users, isLoading, getUsers, error } = useGetUsers();
  const {
    toggles: { reloadUsers },
    setReloadUsers,
  } = useToggleStore();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
  }, [error]);

  const get = () => {
    getUsers({
      roles: { some: { role: { isNot: { OR: [{ role: 'ADMIN' }, { role: 'USER' }] } } } },
      employee: { isHired: false },
    });
    setReloadUsers.off();
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    if (reloadUsers) get();
  }, [reloadUsers]);

  useEffect(() => {
    if (users.length > 0) addUsers(users);
  }, [users]);

  return (
    <List
      spacing={'0.5'}
      display={'flex'}
      flexDirection={'column'}
      flex={'1 1 100%'}
      justifyContent={'start'}
      alignItems={'start'}
      gap={'.1rem'}
    >
      {isLoading && <Indicator loading />}
      {users.length > 0 &&
        users.map(user => {
          return <ItemCandidates key={user.id} candidate={user} />;
        })}
    </List>
  );
};
