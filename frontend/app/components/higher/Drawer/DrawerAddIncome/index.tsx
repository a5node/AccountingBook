'use client';
import React, { useEffect, useState } from 'react';
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
  Flex,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import * as styles from './styles';
import { AddIncomeForm } from './interface';
import { Props } from './props';
import { Btn, H, ListCurrencies, SelectCurrencies, SelectEmployees, SelectProject } from '@app/components';

import { TAddIncomeCommandReq } from '@interface/contracts.types';
import { useAddIncome } from '@hooks/income';
import { useFindAccountingByUser } from '@hooks/accounting';
import { useUserContext } from '@app/contexts';
import { useToggleStore } from '@store/toggles';
import { useUpdateCurrency } from '@hooks/currency';

export const DrawerAddIncome: React.FC<Props> = ({ accountingId, employeeId, projectId }): JSX.Element => {
  const toast = useToast();
  const { setReloadAccounting, setReloadCurrencies } = useToggleStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUserContext();
  const accounting = useFindAccountingByUser();
  const currency = useUpdateCurrency();
  const { add, data, error, reset: addReset } = useAddIncome();
  const [curr, setCurrency] = useState<{ id: number; balance: number } | null>(null);
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<AddIncomeForm>();

  useEffect(() => {
    if (user.id && !accountingId) accounting.get({ userId: Number(user.id) });
  }, [user]);

  useEffect(() => {
    if (curr?.id) {
      currency.update(curr);
      setCurrency(null);
      setReloadCurrencies.on();
    }
  }, [curr]);

  const onSubmit = async ({ value, currencyName, description, employee }: AddIncomeForm) => {
    let id: number = -1;
    if (accounting.data?.id) id = accounting.data?.id;
    if (accountingId) id = accountingId;
    if (id === -1)
      return toast({ title: 'Accounting id not found', status: 'error', duration: 1000, isClosable: true });

    const payload: TAddIncomeCommandReq = {
      accountingId: id,
      value: Number(value),
      currencyId: JSON.parse(currencyName).id,
      description,
    };

    if (employeeId) payload.employeeId = employeeId;
    if (employee) payload.employeeId = JSON.parse(employee).id;

    add(payload);
    if (payload.currencyId && payload.value) {
      const oldBalance = JSON.parse(currencyName).balance;

      setCurrency({
        id: payload.currencyId,
        balance: oldBalance - payload.value,
      });
    }
    reset();
    addReset();
    setReloadAccounting.on();
  };

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (data) toast({ title: 'Income added.', status: 'success', duration: 1000, isClosable: true });
  }, [error, data]);

  return (
    <>
      <Btn aria-label="income" onClick={onOpen}>
        Income
      </Btn>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Income</DrawerHeader>

          <DrawerBody>
            <Grid {...styles.wrap}>
              <GridItem {...styles.employee}>
                <ListCurrencies />
              </GridItem>
              <GridItem {...styles.body}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
                  <Grid {...styles.wrapSelect}>
                    <GridItem {...styles.selectHeader}>
                      <H as={'h5'} size={'1rem'}>
                        Select the employee or project this applies
                      </H>
                    </GridItem>
                    <GridItem {...styles.selectEmployee}>
                      {!employeeId && (
                        <SelectEmployees
                          register={register}
                          name="employee"
                          errors={errors.currencyName?.message}
                          required
                          label="Employee"
                        />
                      )}
                    </GridItem>
                    <GridItem {...styles.selectProject}>
                      {!projectId && (
                        <SelectProject
                          register={register}
                          name="project"
                          errors={errors.currencyName?.message}
                          required
                          label="Project benefits"
                        />
                      )}
                    </GridItem>
                  </Grid>

                  <SelectCurrencies register={register} name="currencyName" errors={errors.currencyName?.message} />
                  <Flex>
                    <FormControl>
                      <FormLabel>The income date:</FormLabel>
                      <Input {...register('createAt')} type="date" placeholder="Enter date when income" />
                    </FormControl>
                  </Flex>
                  <FormControl>
                    <FormLabel>Added value currency:</FormLabel>
                    <Input
                      {...register('value', {
                        required: {
                          value: true,
                          message: 'Enter the correct value.',
                        },
                      })}
                      type="value"
                      placeholder="Enter value"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description about income:</FormLabel>

                    <Textarea {...register('description')} placeholder="Description about income" size="sm" />
                  </FormControl>
                  <Button colorScheme="blue" type="submit" variant="outline">
                    Make income
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
