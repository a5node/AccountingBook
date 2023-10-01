'use client';
import React, { useEffect } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Select, useToast } from '@chakra-ui/react';

import { SelectMainAreasProps } from './props';

import { useFindManyMainArea } from '@hooks/user';
import { useToggleStore } from '@store/toggles';

export const SelectMainArea: React.FC<SelectMainAreasProps> = ({ children, register, name, errors }): JSX.Element => {
  const { data, error, get, reset } = useFindManyMainArea();
  const { toggles, setReloadMainArea } = useToggleStore();

  useEffect(() => {
    if (toggles.reloadMainArea) {
      reset();
      get();
      setReloadMainArea.off();
    }
  }, [toggles.reloadMainArea]);

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
      <FormLabel htmlFor={name}>Main Area</FormLabel>
      <Select
        id={name}
        {...register(name, {
          required: {
            value: true,
            message: 'Main area is not select',
          },
        })}
        placeholder={'Select main area'}
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
