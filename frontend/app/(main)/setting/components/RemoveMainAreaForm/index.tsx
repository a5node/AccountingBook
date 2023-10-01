'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { Props } from './props';
import { useRemoveMainArea } from '@hooks/user';
import { Indicator, SelectMainArea } from '@app/components';
import { useToggleStore } from '@store/toggles';

export const RemoveMainAreaForm: React.FC<Props> = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ mainArea: string }>();
  const { data, remove, isLoading, error, reset: mainareaReset } = useRemoveMainArea();
  const { setReloadMainArea } = useToggleStore();

  const onSubmit = async ({ mainArea }: { mainArea: string }) => {
    const id = JSON.parse(mainArea).id;
    remove({ id });
    setReloadMainArea.on();
    setTimeout(() => {
      mainareaReset();
      reset();
    }, 1000);
  };

  const toast = useToast();
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
        if (data !== null) mainareaReset();
        if (error !== null) mainareaReset();
      }}
    >
      <SelectMainArea register={register} name={'mainArea'} errors={errors.mainArea?.message} />

      <Button type="submit" variant="outline" width={'100%'}>
        {isLoading ? <Indicator loadingItem /> : 'Save'}
      </Button>
    </form>
  );
};
