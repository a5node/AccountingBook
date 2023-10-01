'use client';
import React, { useEffect } from 'react';

import { Accordion, useToast } from '@chakra-ui/react';

import { Props } from './props';
import { ItemWork } from '../Item';
import { useDeleteWork } from '@hooks/work';
import { useToggleStore } from '@store/toggles';

export const ListWork: React.FC<Props> = ({ works }): JSX.Element => {
  const toast = useToast();
  const { setReloadUser, setReloadProject } = useToggleStore();
  const { data, remove, error } = useDeleteWork();

  const removeHandler = (id: number): void => {
    setReloadProject.on();
    setReloadUser.on();
    remove({ id });
  };

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (data) toast({ title: 'Worker remove.', status: 'success', duration: 1000, isClosable: true });
  }, [error, data]);

  return (
    <Accordion allowToggle width={'full'}>
      {works?.map(({ id, ...data }) => {
        return <ItemWork key={id} work={{ id, ...data }} remove={removeHandler} />;
      })}
    </Accordion>
  );
};
