'use client';
import React from 'react';
import { FormControl, FormLabel, FormErrorMessage, Select } from '@chakra-ui/react';

import { SelectCurrenciesProps } from './props';

import { useCurrenciesList } from '@hooks/hooks';

export const SelectCurrencies: React.FC<SelectCurrenciesProps> = ({
  children,
  register,
  name,
  errors,
  required,
}): JSX.Element => {
  const { data } = useCurrenciesList();

  return (
    <FormControl marginBottom={'.5rem'} isInvalid={!!errors}>
      {children}
      <FormErrorMessage>{errors}</FormErrorMessage>
      <FormLabel htmlFor={name}>Currencies</FormLabel>
      <Select
        id={name}
        {...register(name, {
          required: {
            value: required ? false : true,
            message: 'Currency is not select',
          },
        })}
        placeholder={'Select currency'}
      >
        {data?.length > 0 &&
          data?.map(({ name, id, balance }) => {
            return (
              <option key={id} value={JSON.stringify({ id, name, balance })}>
                {name}
              </option>
            );
          })}
      </Select>
    </FormControl>
  );
};
