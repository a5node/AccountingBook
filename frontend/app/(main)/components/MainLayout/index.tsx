'use client';
import { useEffect, useState } from 'react';
import { Grid, GridItem, Flex } from '@chakra-ui/react';

import { MainLayoutStyles } from './styles';

import { useSessionContext, useUserContext } from '@app/contexts';
import {
  SignOutButton,
  SignInButton,
  ActiveLink,
  ToggleThem,
  Loading,
  DrawerAddUser,
  DrawerAddProject,
  DrawerAddExpenditure,
  DrawerAddCurrency,
  DrawerAddIncome,
} from '@app/components';
import { ModalAuth } from '../ModalAuth';

export const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { session } = useSessionContext();
  const { user } = useUserContext();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session?.accessToken) setLoading(false);
  }, [session]);

  return (
    <Grid {...MainLayoutStyles.wrap}>
      <GridItem {...MainLayoutStyles.header}>
        {user.id && <DrawerAddCurrency />}
        {user.id && <DrawerAddExpenditure />}
        {user.id && <DrawerAddIncome />}
        <DrawerAddUser />
        {user.id && <DrawerAddProject />}
        <SignOutButton />
        <SignInButton />
        <ToggleThem />
      </GridItem>
      <GridItem {...MainLayoutStyles.nav}>
        <h2>{user.name}</h2>
        <ActiveLink href={'/'}>main</ActiveLink>
        <ActiveLink href={'/dashboard/'}>dashboard</ActiveLink>
        <ActiveLink href={'/employees/'}>employees</ActiveLink>
        <ActiveLink href={'/candidates/'}>candidates</ActiveLink>
        <ActiveLink href={'/people/'}>people</ActiveLink>
        <ActiveLink href={'/projects/'}>projects</ActiveLink>
        <ActiveLink href={'/setting/'}>setting</ActiveLink>
      </GridItem>
      <GridItem {...MainLayoutStyles.main}>
        <Loading loading={loading} zIndex={'overlay'} />
        <ModalAuth loading={loading} />
        <Flex
          //
          as={'section'}
          width={'100%'}
          gap={'.5rem'}
          position={'relative'}
          marginRight={'1rem'}
          padding={'0 .5rem'}
        >
          {children}
        </Flex>
      </GridItem>
      <GridItem {...MainLayoutStyles.footer}></GridItem>
    </Grid>
  );
};
