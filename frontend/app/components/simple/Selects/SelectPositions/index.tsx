'use client';
import React, { useEffect } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Select, useToast } from '@chakra-ui/react';

import { SelectRolesProps } from './props';

import { useFindManyPositions } from '@hooks/user';
import { useToggleStore } from '@store/toggles';

export const SelectPositions: React.FC<SelectRolesProps> = ({
  children,
  register,
  name,
  errors,
  required,
}): JSX.Element => {
  const toast = useToast();
  const { data, error, get, reset } = useFindManyPositions();
  const { toggles, setReloadPosition } = useToggleStore();

  useEffect(() => {
    if (toggles.reloadPosition) {
      reset();
      get();
      setReloadPosition.off();
    }
  }, [toggles.reloadPosition]);

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
      <FormLabel htmlFor={name}>Positions</FormLabel>
      <Select
        id={name}
        {...register(name, {
          required: {
            value: required ? false : true,
            message: 'Positions is not select',
          },
        })}
        placeholder={'Select positions'}
      >
        {data?.length > 0 &&
          data?.map(({ name, id }) => {
            return (
              <option key={id} value={JSON.stringify({ id, name })}>
                {name.toLowerCase()}
              </option>
            );
          })}
      </Select>
    </FormControl>
  );
};
