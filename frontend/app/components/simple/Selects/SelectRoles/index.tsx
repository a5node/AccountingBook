'use client';
import React, { useEffect } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Select, useToast } from '@chakra-ui/react';

import { SelectRolesProps } from './props';

import { useFindManyRoles } from '@hooks/user';
import { useToggleStore } from '@store/toggles';

export const SelectRoles: React.FC<SelectRolesProps> = ({ children, register, name, errors }): JSX.Element => {
  const { data, error, get, reset } = useFindManyRoles();
  const { toggles, setReloadRoles } = useToggleStore();

  useEffect(() => {
    if (toggles.reloadRoles) {
      reset();
      get();
      setReloadRoles?.off();
    }
  }, [toggles.reloadRoles]);

  const toast = useToast();
  useEffect(() => {
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
    <FormControl marginBottom={'.5rem'} isInvalid={!!errors}>
      {children}
      <FormErrorMessage>{errors}</FormErrorMessage>
      <FormLabel htmlFor={name}>Roles</FormLabel>

      <Select
        id={name}
        {...register(name, {
          required: {
            value: true,
            message: 'Roles is not select',
          },
        })}
        placeholder={'Select roles'}
      >
        {data?.length > 0 &&
          data?.map(({ role, id }) => {
            if (role === 'ADMIN') return;
            const value = JSON.stringify({ id, role });
            return (
              <option key={id} value={value}>
                {role.toLowerCase()}
              </option>
            );
          })}
      </Select>
    </FormControl>
  );
};
