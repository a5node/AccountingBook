'use client';
import React, { useEffect } from 'react';
import {
  Grid,
  GridItem,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  FormControl,
  Input,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { HiMiniCog6Tooth } from 'react-icons/hi2';

import * as styles from './styles';
import { DrawerUpdateCurrencyForm } from './interface';
import { DrawerUpdateCurrencyProps } from './props';

import { BtnIcon } from '@app/components';

import { TUpdateCurrencyCommandReq } from '@interface/contracts.types';
import { useToggleStore } from '@store/toggles';
import { useUpdateCurrency } from '@hooks/currency';

export const DrawerUpdateCurrency: React.FC<DrawerUpdateCurrencyProps> = ({ currency }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { setReloadCurrencies, setReloadAccounting } = useToggleStore();
  const { update, reset: resetCurrancy, error, data } = useUpdateCurrency();
  const { register, handleSubmit, reset } = useForm<DrawerUpdateCurrencyForm>();

  const onSubmit = async ({ name, shortName, balancePlus, balanceMinus }: DrawerUpdateCurrencyForm) => {
    if (!currency) return;
    const { accountingId } = currency;
    const payload: Omit<TUpdateCurrencyCommandReq, 'id' | 'balance'> & { balance: number } = {
      balance: currency?.balance ? currency.balance : 0,
    };

    if (balanceMinus) {
      const value = Number(balanceMinus);
      payload.balance = payload.balance - value;
      payload.expenditure = { create: { accountingId, value, description: 'expenditure' } };
    }

    if (balancePlus) {
      const value = Number(balancePlus);
      payload.balance = payload.balance + value;
      payload.income = { create: { accountingId, value, description: 'income' } };
    }

    if (name) payload.name = name;
    if (shortName) payload.shortName = shortName;

    if (!currency?.id) {
      return toast({ title: 'Currency id is not found.', status: 'error', duration: 1000, isClosable: true });
    }

    update({ id: currency.id, ...payload });

    resetCurrancy();
    reset();
    setReloadCurrencies.on();
    setReloadAccounting.on();
  };

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (data) toast({ title: 'Currency update.', status: 'success', duration: 1000, isClosable: true });
  }, [error, data]);

  return (
    <>
      <BtnIcon
        width="30px"
        height="30px"
        fontSize="20px"
        aria-label="update user"
        icon={<HiMiniCog6Tooth />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Update currency.</DrawerHeader>
          <DrawerBody>
            <Grid {...styles.wrap}>
              <GridItem {...styles.body}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
                  <FormControl>
                    <FormLabel>Plus to balance: {currency ? currency.balance : 0}</FormLabel>
                    <Input {...register('balancePlus')} type="number" placeholder="Enter new price" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Minus to balance: {currency ? currency.balance : 0}</FormLabel>
                    <Input {...register('balanceMinus')} type="number" placeholder="Enter new price" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Currency name: {currency ? currency?.name : ''}</FormLabel>
                    <Input {...register('name')} type="text" placeholder="Enter position name" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Currency short name: {currency ? currency.shortName : 0}</FormLabel>
                    <Input {...register('shortName')} type="text" placeholder="Enter new hours" />
                  </FormControl>

                  <Button colorScheme="blue" type="submit" variant="outline">
                    Update
                  </Button>
                </form>
              </GridItem>

              <GridItem {...styles.footer}>
                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                </DrawerFooter>
              </GridItem>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
