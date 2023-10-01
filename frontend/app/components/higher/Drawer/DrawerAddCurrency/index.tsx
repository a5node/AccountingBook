'use client';
import React, { useEffect } from 'react';
import {
  Grid,
  GridItem,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import * as styles from './styles';
import { Props } from './props';
import { AddCurrencyForm } from './interface';

import { useAddCurrency } from '@hooks/currency';
import { useToggleStore } from '@store/toggles';
import { useUserContext } from '@app/contexts';
import { Btn, H, ListCurrencies } from '@app/components';

export const DrawerAddCurrency: React.FC<Props> = (): JSX.Element => {
  const toast = useToast();
  const { user } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setReloadCurrencies, setReloadAccounting } = useToggleStore();

  const { data, add, error, reset: resetCurrency } = useAddCurrency();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddCurrencyForm>();

  useEffect(() => {
    if (data) {
      setReloadCurrencies.on();
      setReloadAccounting.on();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (data) toast({ title: 'Currency added.', status: 'success', duration: 1000, isClosable: true });
  }, [error, data]);

  const onSubmit = async ({ name, shortName }: AddCurrencyForm) => {
    if (!user.id) {
      return toast({ title: 'User id not found!', status: 'error', duration: 2000, isClosable: true });
    }
    const payload: AddCurrencyForm = { name, shortName };

    add({ userId: Number(user.id), ...payload });
    reset();
    resetCurrency();
    setReloadAccounting.on();
  };

  return (
    <>
      <Btn onClick={onOpen}>currency</Btn>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            display={'grid'}
            gridTemplateColumns={'1fr 100px'}
            gridTemplateRows={'50px'}
          >
            <H as="h3" size={'1rem'}>
              Add a currency to the accounting.
            </H>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerHeader>

          <DrawerBody>
            <Grid {...styles.wrap}>
              <GridItem {...styles.list}>
                <ListCurrencies />
              </GridItem>
              <GridItem {...styles.main}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
                  <FormControl isInvalid={!!errors?.name?.message}>
                    <FormLabel>Currency name</FormLabel>
                    <Input
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'Enter the correct  name. *',
                        },
                      })}
                      type="text"
                      placeholder="Enter  name"
                    />
                    <FormErrorMessage>{errors && <>{errors.name?.message}</>}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.shortName?.message}>
                    <FormLabel>Currency short name</FormLabel>
                    <Input
                      {...register('shortName', {
                        required: {
                          value: true,
                          message: 'Enter the correct short name. *',
                        },
                      })}
                      type="text"
                      placeholder="Enter short name"
                    />
                    <FormErrorMessage>{errors && <>{errors.shortName?.message}</>}</FormErrorMessage>
                  </FormControl>
                  <Button colorScheme="blue" type="submit" variant="outline" margin={'1rem auto'}>
                    Add
                  </Button>
                </form>
              </GridItem>

              <GridItem {...styles.footer}>
                <DrawerFooter></DrawerFooter>
              </GridItem>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
