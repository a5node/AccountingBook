'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, FormControl, FormLabel, FormErrorMessage, Button, useToast } from '@chakra-ui/react';

import { Props } from './props';
import { useCreateRole } from '@hooks/user';
import { Indicator } from '@app/components';
import { useToggleStore } from '@store/toggles';

export const AddRolesForm: React.FC<Props> = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ role: string }>();
  const { data, create, isLoading, error, reset: roleReset } = useCreateRole();
  const { setReloadRoles } = useToggleStore();

  const onSubmit = async ({ role }: { role: string }) => {
    create({ role: role.toUpperCase() });
    setReloadRoles.on();
    setTimeout(() => {
      roleReset();
      reset();
    }, 1000);
  };

  const toast = useToast();
  useEffect(() => {
    if (data) {
      toast({
        title: `${data.role} added.`,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors?.role?.message} marginBottom={'.5rem'}>
        <FormErrorMessage>{errors && <>{errors.role?.message}</>}</FormErrorMessage>
        <FormLabel>Roles</FormLabel>
        <Input
          {...register('role', {
            required: { value: true, message: 'Enter the correct role.' },
          })}
          type="text"
          placeholder="Enter your role"
          onClick={() => {
            if (data !== null) roleReset();
            if (error !== null) roleReset();
          }}
        />
      </FormControl>

      <Button type="submit" variant="outline" width={'100%'}>
        {isLoading ? <Indicator loadingItem /> : 'Save'}
      </Button>
    </form>
  );
};
