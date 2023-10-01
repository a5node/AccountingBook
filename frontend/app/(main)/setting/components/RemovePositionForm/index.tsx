'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { Props } from './props';
import { useRemovePosition } from '@hooks/user';
import { Indicator, SelectPositions } from '@app/components';
import { useToggleStore } from '@store/toggles';

export const RemovePositionForm: React.FC<Props> = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ position: string }>();
  const { data, remove, isLoading, error, reset: positionReset } = useRemovePosition();
  const { setReloadPosition } = useToggleStore();
  const toast = useToast();

  const onSubmit = async ({ position }: { position: string }) => {
    const id = JSON.parse(position).id;
    remove({ id });
    setReloadPosition.on();
    setTimeout(() => {
      positionReset();
      reset();
    }, 1000);
  };

  useEffect(() => {
    if (data) {
      toast({
        title: `${data.name} remove.`,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={() => {
        if (data !== null) positionReset();
        if (error !== null) positionReset();
      }}
    >
      <SelectPositions register={register} name={'position'} errors={errors.position?.message} />

      <Button type="submit" variant="outline" width={'100%'}>
        {isLoading ? <Indicator loadingItem /> : 'Save'}
      </Button>
    </form>
  );
};
