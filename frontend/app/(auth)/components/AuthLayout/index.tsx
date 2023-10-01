'use client';
import { Grid, GridItem } from '@chakra-ui/react';

import { AuthLayoutStyles } from './styles';

import { SignOutButton, SignInButton, SignUpButton, ToggleThem } from '@app/components';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  return (
    <Grid {...AuthLayoutStyles.wrap}>
      <GridItem {...AuthLayoutStyles.header}>
        <SignInButton />
        <SignUpButton />
        <SignOutButton />
        <ToggleThem />
      </GridItem>

      <GridItem {...AuthLayoutStyles.main}>
        <section>{children}</section>
      </GridItem>
      <GridItem {...AuthLayoutStyles.footer}></GridItem>
    </Grid>
  );
};
