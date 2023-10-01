'use client';
import React, { useEffect } from 'react';
import { List, useToast } from '@chakra-ui/react';
import { useFindProjects } from '@hooks/project';

import { ItemProjects } from './Item';
import { Indicator } from '@app/components';
import { useToggleStore } from '@store/toggles';

export const ListProjects: React.FC = (): JSX.Element => {
  const { data, isLoading, get, error } = useFindProjects();
  const {
    toggles: { reloadProjects },
    setReloadProjects,
  } = useToggleStore();
  const toast = useToast();

  useEffect(() => {
    get({});
  }, []);

  useEffect(() => {
    if (reloadProjects) {
      get({});
      setReloadProjects.off();
    }
  }, [reloadProjects]);

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
  }, [error]);

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
      {data.length > 0 &&
        data.map(project => {
          return <ItemProjects key={project.id} project={project} />;
        })}
    </List>
  );
};
