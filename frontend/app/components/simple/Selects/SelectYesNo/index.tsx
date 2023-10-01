'use client';
import React from 'react';
import { FormControl, FormLabel, FormErrorMessage, Select } from '@chakra-ui/react';

import { SelectMainAreasProps } from './props';

export const SelectYesNo: React.FC<SelectMainAreasProps> = ({
  register,
  name,
  errors,
  label,
  required,
}): JSX.Element => {
  return (
    <FormControl marginBottom={'.5rem'} isInvalid={!!errors}>
      <FormErrorMessage>{errors}</FormErrorMessage>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        id={name}
        {...register(name, {
          required: {
            value: required ? false : true,
            message: 'Value is not select',
          },
        })}
        placeholder={'Select yes or no'}
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </Select>
    </FormControl>
  );
};
