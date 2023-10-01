'use client';
import React, { useEffect, useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

import { AuthBtnsProps } from './props';

import { useSessionContext } from '@app/contexts';
import { useIsAdmin } from '@hooks/auth';

export const SignOutButton: React.FC<AuthBtnsProps> = ({ ...props }): JSX.Element => {
  const { signOut, session } = useSessionContext();
  const [state, setState] = useState<boolean>(true);

  useEffect(() => {
    if (session?.accessToken) setState(true);
    else setState(false);
  }, [session]);

  return (
    <>
      {state && (
        <Button
          variant="authBtn"
          {...props}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign Out
        </Button>
      )}
    </>
  );
};

export const SignInButton: React.FC<AuthBtnsProps> = ({ layout, ...props }): JSX.Element => {
  const { signIn, session } = useSessionContext();
  const [state, setState] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (session?.accessToken && !layout) setState(false);
    else setState(true);
    if (pathname === '/signin/') setState(false);
  }, [session, pathname]);

  return (
    <>
      {state && (
        <Button
          {...props}
          variant="authBtn"
          onClick={(e): void => {
            e.preventDefault();
            signIn();
          }}
        >
          Sign In
        </Button>
      )}
    </>
  );
};

export const SignUpButton: React.FC<AuthBtnsProps> = ({ ...props }): JSX.Element => {
  const { isAdmin, error } = useIsAdmin();
  const { signIn, session } = useSessionContext();
  const [state, setState] = useState<boolean>(false);
  const pathname = usePathname();

  const toast = useToast();
  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
  }, [error]);

  useEffect(() => {
    if (session?.accessToken) setState(false);
    else setState(true);
    if (pathname === '/signup/') setState(false);
  }, [session, pathname]);

  return (
    <>
      {!isAdmin && state && (
        <Button
          {...props}
          variant="authBtn"
          onClick={(e): void => {
            e.preventDefault();
            signIn({ callback: '/signup', type: 'signup' });
          }}
        >
          Sign Up
        </Button>
      )}
    </>
  );
};
