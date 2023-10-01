'use client';
import React, { useEffect } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Select, useToast } from '@chakra-ui/react';

import { SelectEmployeesProps } from './props';
import { useGetUsers } from '@hooks/user';
import { Indicator } from '@app/components';

export const SelectEmployees: React.FC<SelectEmployeesProps> = ({
  children,
  register,
  name,
  errors,
  works,
  required,
  label,
}): JSX.Element => {
  const toast = useToast();
  const { users, getUsers, error, isLoading } = useGetUsers();

  const worksId = (): { id: number }[] => {
    if (!works) return [];
    return works.map(({ id }) => {
      return { id };
    });
  };

  useEffect(() => {
    if (works) {
      getUsers({
        roles: { some: { role: { isNot: { OR: [{ role: 'ADMIN' }] } } } },
        employee: { isHired: true, works: { every: { NOT: worksId() } } },
      });
    } else {
      getUsers({
        roles: { some: { role: { isNot: { OR: [{ role: 'ADMIN' }] } } } },
        employee: { isHired: true },
      });
    }
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
      <FormLabel htmlFor={name}>{label ? label : 'Employee'}</FormLabel>

      <Select
        id={name}
        {...register(name, {
          required: {
            value: required ? false : true,
            message: 'Employee is not select',
          },
        })}
        placeholder={'Select employee'}
      >
        {users?.length > 0 &&
          users?.map(({ id, employee, name, ...data }) => {
            const value = JSON.stringify({ id, employee, name, ...data });
            return (
              <option
                key={id}
                value={value}
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gridTemplateRows: '1rem',
                  gap: '0.3rem',
                }}
              >
                {`${employee?.position}:${name}:${employee?.positionName}`}
              </option>
            );
          })}
      </Select>
    </FormControl>
  );
};
