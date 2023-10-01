'use client';
import React from 'react';
import { Flex } from '@chakra-ui/react';

import { H } from '@app/components';
import { SignInForm } from '../SignInForm';

export const SignIn: React.FC = (): JSX.Element => {
  return (
    <Flex display={'flex'} height={'70vh'} justifyContent={'center'} alignItems={'center'}>
      <Flex display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'1rem'}>
        <H as={'h1'}>Sign In</H>
        <SignInForm />
      </Flex>
    </Flex>
  );
};
