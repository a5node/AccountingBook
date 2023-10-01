'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, FormControl, FormLabel, FormErrorMessage, Button, useToast } from '@chakra-ui/react';

import { Props } from './props';
import { useCreateMainArea } from '@hooks/user';
import { Indicator } from '@app/components';
import { useToggleStore } from '@store/toggles';

export const AddMainAreaForm: React.FC<Props> = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ mainarea: string }>();
  const { setReloadMainArea } = useToggleStore();
  const toast = useToast();
  const { data, create, isLoading, error, reset: resetMainArea } = useCreateMainArea();

  const onSubmit = async ({ mainarea }: { mainarea: string }) => {
    const name = mainarea.toLowerCase();
    create({ name });
    setReloadMainArea.on();

    setTimeout(() => {
      resetMainArea();
      reset();
    }, 1000);
  };

  useEffect(() => {
    if (data) {
      toast({
        title: `${data.name} added.`,
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
      <FormControl isInvalid={!!errors?.mainarea?.message} marginBottom={'.5rem'}>
        <FormErrorMessage>{errors && <>{errors.mainarea?.message}</>}</FormErrorMessage>

        <FormLabel>Main Area</FormLabel>
        <Input
          {...register('mainarea', {
            required: { value: true, message: 'Enter the correct mainarea.' },
          })}
          type="text"
          placeholder="Enter your mainarea"
          onClick={() => {
            if (data !== null) resetMainArea();
            if (error !== null) resetMainArea();
          }}
        />
      </FormControl>

      <Button type="submit" variant="outline" width={'100%'}>
        {isLoading ? <Indicator loadingItem /> : 'Save'}
      </Button>
    </form>
  );
};
