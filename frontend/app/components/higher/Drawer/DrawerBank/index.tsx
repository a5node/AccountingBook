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
  FormErrorMessage,
  Input,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Btn, ListBanks } from '@app/components';

import * as styles from './styles';
import { AddUserBankForm } from './interface';
import { useAddUserBank, useGetUserBanks } from '@hooks/bank';
import { Props } from './props';
import { useToggleStore } from '@store/toggles';

export const DrawerBank: React.FC<Props> = ({ employeeId }): JSX.Element => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setReloadUser } = useToggleStore();
  const getBanks = useGetUserBanks();

  const { data, add, error, reset: resetBank } = useAddUserBank();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserBankForm>();

  useEffect(() => {
    if (employeeId) getBanks.get({ employeeId });
  }, []);

  useEffect(() => {
    if (data) {
      if (employeeId) getBanks.get({ employeeId });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (data) toast({ title: 'Bank added.', status: 'success', duration: 1000, isClosable: true });
  }, [error, data]);

  const onSubmit = async ({ card, linkpay, iban, bankname }: AddUserBankForm) => {
    if (!employeeId) {
      return toast({ title: 'Employee id not found!', status: 'error', duration: 2000, isClosable: true });
    }
    const payload: AddUserBankForm = {};
    if (card) payload.card = card;
    if (linkpay) payload.linkpay = linkpay;
    if (iban) payload.iban = iban;
    if (bankname) payload.bankname = bankname;

    add({ employeeId, ...payload });
    reset();
    resetBank();
    setReloadUser.on();
  };

  return (
    <>
      <Btn onClick={onOpen}>bank</Btn>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add a bank to the employee.</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
              <Grid {...styles.wrap}>
                <GridItem {...styles.main}>
                  <FormControl isInvalid={!!errors?.bankname?.message}>
                    <FormLabel>Bank name</FormLabel>
                    <Input
                      {...register('bankname', {
                        required: {
                          value: true,
                          message: 'Enter the correct bank name. *',
                        },
                      })}
                      type="text"
                      placeholder="Enter bank name"
                    />
                    <FormErrorMessage>{errors && <>{errors.bankname?.message}</>}</FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Card</FormLabel>
                    <Input {...register('card')} type="text" placeholder="Enter card" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Link pay</FormLabel>
                    <Input {...register('linkpay')} type="text" placeholder="Enter linkpay" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>IBAN</FormLabel>
                    <Input {...register('iban')} type="text" placeholder="Enter IBAN" />
                  </FormControl>
                </GridItem>

                <GridItem {...styles.list}>
                  <ListBanks banks={getBanks.data} />
                </GridItem>

                <GridItem {...styles.footer}>
                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="blue" type="submit" variant="outline">
                      Save
                    </Button>
                  </DrawerFooter>
                </GridItem>
              </Grid>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
