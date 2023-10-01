'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';

import { theme } from '@app/themes/indext';
import { SessionProvider } from './session.context';
import { UserProvider } from './user.context';
import { UsersProvider } from './users.context';

type Props = {
  children?: React.ReactNode;
};

export const AppProvider = async ({ children }: Props): Promise<JSX.Element> => {
  return (
    <>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <SessionProvider>
            <UserProvider>
              <UsersProvider>{children}</UsersProvider>
            </UserProvider>
          </SessionProvider>
        </ChakraProvider>
      </CacheProvider>
    </>
  );
};
