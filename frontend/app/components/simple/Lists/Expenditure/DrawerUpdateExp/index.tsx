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
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { HiMiniCog6Tooth } from 'react-icons/hi2';

import * as styles from './styles';
import { DrawerUpdateExpenditureForm } from './interface';
import { DrawerUpdateExpenditureProps } from './props';

import { BtnIcon, SelectYesNo } from '@app/components';

import { TUpdateExpenditureCommandReq } from '@interface/contracts.types';
import { useToggleStore } from '@store/toggles';
import { useUpdateExpenditure } from '@hooks/expenditure';

export const DrawerUpdateExp: React.FC<DrawerUpdateExpenditureProps> = ({ expenditure }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { setReloadExp } = useToggleStore();
  const { update, reset: resetExp, error, data } = useUpdateExpenditure();
  const { register, handleSubmit, reset } = useForm<DrawerUpdateExpenditureForm>();

  const onSubmit = async ({
    isRefund,
    refundAt,
    description,
    currencyName,
    value,
    createAt,
  }: DrawerUpdateExpenditureForm) => {
    if (!expenditure) return;

    const payload: Omit<TUpdateExpenditureCommandReq, 'id'> = {};

    if (isRefund) payload.isRefund = isRefund === 'yes';
    if (refundAt) payload.refundAt = new Date(refundAt);
    if (createAt) payload.createAt = new Date(createAt);
    if (currencyName) payload.currencyName = currencyName;
    if (description) payload.description = description;

    if (value) {
      payload.value = Number(value);
    }

    if (!expenditure?.id) {
      return toast({ title: 'Expenditure id is not found.', status: 'error', duration: 1000, isClosable: true });
    }

    update({ id: expenditure.id, ...payload });

    resetExp();
    reset();
    setReloadExp.on();
    // setReloadAccounting.on();
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
                    <FormLabel>The expenditure date:</FormLabel>
                    <Input {...register('createAt')} type="date" placeholder="Enter date when expenditure" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>The refund date:</FormLabel>
                    <Input {...register('refundAt')} type="date" placeholder="Enter date when refund" />
                  </FormControl>

                  <SelectYesNo register={register} name={'isHired'} label={'Refund'} required />
                  <FormControl>
                    <FormLabel>Added value expenditure:</FormLabel>
                    <Input {...register('value')} type="value" placeholder="Enter value" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description about expenditure:</FormLabel>

                    <Textarea {...register('description')} placeholder="Description about expenditure" size="sm" />
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
