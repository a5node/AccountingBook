'use client';
import React, { useEffect, memo } from 'react';

import { ConnecterProps } from './props';
import { useUserConnect } from '@hooks/auth';
import { Loader } from '@app/components';
import { useRouter } from 'next/navigation';

export const Connecter: React.FC<ConnecterProps> = (): JSX.Element => {
  const { isAuth, error, connect } = useUserConnect();
  const router = useRouter();
  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (isAuth) router.push('/');
  }, [isAuth]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return <>{<Loader size={'lg'} />}</>;
};

export default memo(Connecter);
