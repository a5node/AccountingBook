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

import * as styles from './styles';
import { PaymentEmployeeForm } from './interface';
import { Props } from './props';
import { Btn } from '@app/components';

import { useUpdatePaymentEmployee, useCreatePaymentEmployee } from '@hooks/paymentEmployee';
import { useToggleStore } from '@store/toggles';

export const DrawerPaymentEmployee: React.FC<Props> = ({ userId, payment }): JSX.Element => {
  const toast = useToast();
  const { setReloadUser } = useToggleStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { update, reset: resetPayment, error, data } = useUpdatePaymentEmployee();
  const { create, data: createData } = useCreatePaymentEmployee();
  const { register, handleSubmit, reset } = useForm<PaymentEmployeeForm>();

  const onSubmit = async ({ salary, bonus, paidLeave, toPayoff, paid, duty }: PaymentEmployeeForm) => {
    let id: number = -1;
    if (!userId) return;
    if (payment?.id) id = payment.id;
    if (createData) id = createData.id;
    if (id === -1) return;
    const payload = { ...payment, employeeId: userId, id };

    if (bonus) payload.bonus = bonus;
    if (salary) payload.salary = salary;
    if (paidLeave) payload.paidLeave = paidLeave;
    if (toPayoff) payload.toPayoff = toPayoff;
    if (paid) payload.paid = paid;
    if (duty) payload.duty = duty;

    update(payload);
    reset();
    resetPayment();
    setReloadUser.on();
  };

  useEffect(() => {
    if (!payment?.id) {
      if (userId) {
        create({ salary: 0, bonus: 0, paidLeave: 0, toPayoff: 0, paid: 0, duty: 0, employeeId: userId });
      }
    }
  }, []);

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (data) toast({ title: 'User added.', status: 'success', duration: 1000, isClosable: true });
  }, [error, data]);

  return (
    <>
      <Btn aria-label="Payment" onClick={onOpen}>
        Payment
      </Btn>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Status of payment</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
              <Grid {...styles.wrap}>
                <GridItem {...styles.body}>
                  <FormControl>
                    <FormLabel>
                      Salary now: {data ? data.salary : createData ? createData.salary : payment?.salary}
                    </FormLabel>
                    <Input {...register('salary')} type="number" placeholder="Enter new salary" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>
                      Bonus now: {data ? data.bonus : createData ? createData.bonus : payment?.bonus}
                    </FormLabel>
                    <Input {...register('bonus')} type="number" placeholder="Enter new bonus" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>
                      Paid leave now: {data ? data.paidLeave : createData ? createData.paidLeave : payment?.paidLeave}
                    </FormLabel>
                    <Input {...register('paidLeave')} type="number" placeholder="Enter new paidLeave" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Paid now: {data ? data.paid : createData ? createData.paid : payment?.paid}</FormLabel>
                    <Input {...register('paid')} type="number" placeholder="Enter new paid" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>
                      Paid out now: {data ? data.toPayoff : createData ? createData.toPayoff : payment?.toPayoff}
                    </FormLabel>
                    <Input {...register('toPayoff')} type="number" placeholder="Enter new toPayoff" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Duty now: {data ? data.duty : createData ? createData.duty : payment?.duty}</FormLabel>
                    <Input {...register('duty')} type="number" placeholder="Enter new duty" />
                  </FormControl>
                </GridItem>

                <GridItem {...styles.footer}>
                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="blue" type="submit" variant="outline">
                      Submit
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
