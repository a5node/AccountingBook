'use client';
import React, { useEffect } from 'react';
import { List, useToast } from '@chakra-ui/react';
import { useGetUsers } from '@hooks/user';

import { ItemEmployee } from './Item';
import { Indicator } from '@app/components';
import { useUsersContext } from '@app/contexts';

export const ListEmployees: React.FC = (): JSX.Element => {
  const { addUsers } = useUsersContext();
  const { users, isLoading, getUsers, error } = useGetUsers();

  const toast = useToast();
  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
  }, [error]);

  useEffect(() => {
    getUsers({
      roles: {
        some: {
          role: { isNot: { OR: [{ role: 'ADMIN' }] } },
        },
      },
      employee: { isHired: true },
    });
  }, []);

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
        users.map(employee => {
          return <ItemEmployee key={employee.id} employee={employee} />;
        })}
    </List>
  );
};
