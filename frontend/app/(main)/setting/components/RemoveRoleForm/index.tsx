'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { Props } from './props';
import { useDeleteRoles } from '@hooks/user';
import { Indicator, SelectRoles } from '@app/components';
import { useToggleStore } from '@store/toggles';

export const RemoveRolesForm: React.FC<Props> = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ role: string }>();
  const { data, remove, isLoading, error, reset: rolesReset } = useDeleteRoles();
  const { setReloadRoles } = useToggleStore();

  const onSubmit = async ({ role }: { role: string }) => {
    const id = JSON.parse(role).id;
    remove({ id });
    setReloadRoles.on();
    setTimeout(() => {
      rolesReset();
      reset();
    }, 1000);
  };

  const toast = useToast();
  useEffect(() => {
    if (data) {
      toast({
        title: `${data.role} remove.`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    }
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({
        title: msg,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  }, [data, error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={() => {
        if (data !== null) rolesReset();
        if (error !== null) rolesReset();
      }}
    >
      <SelectRoles register={register} name={'role'} errors={errors.role?.message} />

      <Button type="submit" variant="outline" width={'100%'}>
        {isLoading ? <Indicator loadingItem /> : 'Save'}
      </Button>
    </form>
  );
};
