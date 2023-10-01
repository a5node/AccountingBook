'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, FormControl, FormLabel, FormErrorMessage, Button, useToast } from '@chakra-ui/react';

import { Props } from './props';
import { useCreatePosition } from '@hooks/user';
import { Indicator } from '@app/components';
import { useToggleStore } from '@store/toggles';

export const AddPositionForm: React.FC<Props> = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ position: string }>();
  const { data, create, isLoading, error, reset: positionReset } = useCreatePosition();
  const { setReloadPosition } = useToggleStore();

  const onSubmit = async ({ position }: { position: string }) => {
    const name = position.toLowerCase();
    create({ name });
    setReloadPosition.on();
    setTimeout(() => {
      positionReset();
      reset();
    }, 1000);
  };

  const toast = useToast();
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
      <FormControl isInvalid={!!errors?.position?.message} marginBottom={'.5rem'}>
        <FormErrorMessage>{errors && <>{errors.position?.message}</>}</FormErrorMessage>
        <FormLabel>Position</FormLabel>
        <Input
          {...register('position', {
            required: { value: true, message: 'Enter the correct position.' },
          })}
          type="text"
          placeholder="Enter your position"
          onClick={() => {
            if (data !== null) positionReset();
            if (error !== null) positionReset();
            reset();
          }}
        />
      </FormControl>

      <Button type="submit" variant="outline" width={'100%'}>
        {isLoading ? <Indicator loadingItem /> : 'Save'}
      </Button>
    </form>
  );
};
