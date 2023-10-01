'use client';
import React, { useEffect } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Select, useToast } from '@chakra-ui/react';

import { SelectProjectProps } from './props';
import { useFindProjects } from '@hooks/project';
import { Indicator } from '@app/components';

export const SelectProject: React.FC<SelectProjectProps> = ({
  children,
  register,
  name,
  errors,
  works,
  required,
  label,
}): JSX.Element => {
  const toast = useToast();
  const { data, isLoading, get, error } = useFindProjects();

  const employeesId = (): { employeeId: number }[] => {
    if (!works) return [];
    return works.map(({ employeeId }) => ({ employeeId }));
  };

  useEffect(() => {
    if (works) {
      get({ NOT: { workers: { some: { NOT: employeesId() } } } });
    } else get({});
  }, []);

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
  }, [error]);

  if (isLoading) return <Indicator loadingItem />;

  return (
    <FormControl marginBottom={'.5rem'} isInvalid={!!errors}>
      {children}
      <FormErrorMessage>{errors}</FormErrorMessage>
      <FormLabel htmlFor={name}>{label ? label : 'Project'}</FormLabel>

      <Select
        id={name}
        {...register(name, {
          required: {
            value: required ? false : true,
            message: 'Project is not select',
          },
        })}
        placeholder={'Select project'}
      >
        {data?.length > 0 &&
          data?.map(({ id, name, isEnd, ...data }) => {
            if (isEnd) return <></>;
            const value = JSON.stringify({ id, name, isEnd, ...data });
            return (
              <option key={id} value={value}>
                {name}
              </option>
            );
          })}
      </Select>
    </FormControl>
  );
};
