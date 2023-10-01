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
  Select,
  Divider,
  List,
} from '@chakra-ui/react';

import * as styles from './styles';
import { Props } from './props';

import { Btn, Indicator } from '@app/components';

import {
  useAddUserHireDate,
  useUpdateHireDate,
  useRemoveUserHireDate,
  useCreateHireDate,
  useGetUserHireDate,
} from '@hooks/hiredate';
import { DateFns } from '@lib/DateFns';
import { Item } from './components';
import { useUpdateUserById } from '@hooks/user';
import { useToggleStore } from '@store/toggles';

export const DrawerHireDate: React.FC<Props> = (props): JSX.Element => {
  const { setReloadUser } = useToggleStore();
  const dateFns = new DateFns();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addHireDate = useAddUserHireDate();
  const udateHireDate = useUpdateHireDate();
  const createHireDate = useCreateHireDate();
  const removeHireDate = useRemoveUserHireDate();
  const getHireDate = useGetUserHireDate();
  const { user, updateUserEmployee } = useUpdateUserById(props.userId);

  const reload = () => {
    if (props.employeeId) getHireDate.get({ employeeId: props.employeeId });
  };

  const errorToast = (title: string) => {
    toast({ title, status: 'error', duration: 1000, isClosable: true });
  };
  const successToast = (title: string) => {
    toast({ title, status: 'success', duration: 1000, isClosable: true });
  };

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    if (addHireDate.data) {
      reload();
      addHireDate.reset();
    }
    if (udateHireDate.data) {
      reload();
      udateHireDate.reset();
      successToast('Hire date update.');
    }
    if (removeHireDate.data) {
      reload();
      removeHireDate.reset();
      successToast('Hire date remove.');
    }
    if (createHireDate.data) {
      reload();
      createHireDate.reset();
      successToast('Hire date added.');
    }
  }, [addHireDate.data, udateHireDate.data, removeHireDate.data, createHireDate.data]);

  useEffect(() => {
    if (addHireDate.error) {
      reload();
      addHireDate.reset();
    }
    if (udateHireDate.error) {
      reload();
      udateHireDate.reset();
      errorToast('Hire date is not update.');
    }
    if (removeHireDate.error) {
      reload();
      removeHireDate.reset();
      errorToast('Hire date is not remove.');
    }
    if (createHireDate.error) {
      reload();
      createHireDate.reset();
      errorToast('Hire date is not added.');
    }
  }, [addHireDate.error, udateHireDate.error, removeHireDate.error, createHireDate.error]);

  useEffect(() => {
    if (props.employeeIsHired) {
      if (getHireDate.data?.hireDates.length === 0) {
        if (props.employeeId) addHireDate.add({ employeeId: props.employeeId });
      }
    }
  }, [getHireDate.data]);

  const [hiredateId, setHireDateId] = useState<number | null>(null);
  const [fired, setFired] = useState<string>('');
  const [hired, setHired] = useState<string>('');
  const [commit, setCommit] = useState<string>('');
  const reset = () => {
    setFired('');
    setHired('');
    setCommit('');
    setHireDateId(null);
    // if (props?.reload) props?.reload();
    setReloadUser.on();
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setHireDateId(id);
  };
  const handleChangeFired = (e: React.ChangeEvent<HTMLInputElement>) => setFired(e.target.value);
  const handleChangeHired = (e: React.ChangeEvent<HTMLInputElement>) => setHired(e.target.value);
  const handleChangeCommit = (e: React.ChangeEvent<HTMLInputElement>) => setCommit(e.target.value);

  const createClickHireDate = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) e.preventDefault();
    let employeeId: number = -1;
    if (props.employeeId) employeeId = props.employeeId;
    if (user?.employee?.id) employeeId = user?.employee?.id;
    if (employeeId === -1) return errorToast('Employee id is not found.');
    const payload: {
      commit?: string;
      hired?: Date;
      fired?: Date;
    } = {};
    if (fired) payload.fired = new Date(fired);
    if (hired) payload.hired = new Date(hired);
    if (commit) payload.commit = commit;

    createHireDate.create({ employeeId, ...payload });
    reset();
  };

  const updateClickHireDate = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) e.preventDefault();
    if (!hiredateId) return errorToast('Hire date id is not found');
    if (!props.employeeId) return errorToast('Employee id is not found.');
    const payload: {
      commit?: string;
      hired?: Date;
      fired?: Date;
    } = {};
    if (fired) payload.fired = new Date(fired);
    if (hired) payload.hired = new Date(hired);
    if (commit) payload.commit = commit;

    udateHireDate.update({ id: hiredateId, employeeId: props.employeeId, ...payload });
    reset();
  };

  const hireClickHireDate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!props.userId) return errorToast('Employee id is not found.');
    const role = props.roles?.find(({ role }) => role === 'CANDIDATE');
    updateUserEmployee(role ? role.role : '', { isHired: true });
    if (!hired) setHired(new Date().toUTCString());
  };

  const fireClickHireDate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!props.userId) return errorToast('Employee id is not found.');
    const role = props.roles?.find(({ role }) => role === 'CANDIDATE');
    updateUserEmployee(role ? role.role : '', { isHired: false });
    const hireDates = getHireDate.data?.hireDates;
    if (!hireDates) return;
    const lastHired = hireDates.length - 1;
    const hiredate = hireDates[lastHired];

    if (!fired) setFired(new Date().toUTCString());
    setHireDateId(hiredate.id);
  };

  useEffect(() => {
    if (user?.employee) {
      const { isHired } = user.employee;
      if (isHired === true) createClickHireDate();
      if (isHired === false) updateClickHireDate();
    }
  }, [user]);

  const removeClickHireDate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!hiredateId) return errorToast('Hire date id is not found');
    if (!props.employeeId) return errorToast('Employee id is not found.');
    removeHireDate.remove({ id: hiredateId, employeeId: props.employeeId });
  };

  return (
    <>
      <Btn onClick={onOpen}>Hire</Btn>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Hire data for employee.</DrawerHeader>

          <DrawerBody>
            <Grid {...styles.wrap}>
              <GridItem {...styles.create}>
                <FormControl>
                  <FormLabel>Comment about hiring</FormLabel>
                  <Input type="text" placeholder="Enter your comment*" onChange={handleChangeCommit} />
                </FormControl>
                <FormControl>
                  <FormLabel>Employee hired</FormLabel>
                  <Input type="datetime-local" onChange={handleChangeHired} />
                </FormControl>
                <FormControl marginBottom={'1rem'}>
                  <FormLabel>Employee fired</FormLabel>
                  <Input type="datetime-local" onChange={handleChangeFired} />
                </FormControl>
                <Button colorScheme="blue" variant="outline" mr={3} onClick={createClickHireDate} marginBottom={'1rem'}>
                  Add
                </Button>
                {props.employeeIsHired && (
                  <Button colorScheme="blue" variant="outline" mr={3} onClick={fireClickHireDate} marginBottom={'1rem'}>
                    Fire
                  </Button>
                )}
                {!props.employeeIsHired && (
                  <Button colorScheme="blue" variant="outline" mr={3} onClick={hireClickHireDate} marginBottom={'1rem'}>
                    Hire
                  </Button>
                )}
                <Divider marginBottom={'1rem'} />
                <FormControl marginBottom={'1rem'}>
                  <FormLabel htmlFor={'select_update'}>Select the hire date for update or remove.</FormLabel>
                  <Select id={'select_update'} placeholder={'Select hire date'} onChange={handleChangeSelect}>
                    {getHireDate?.data?.hireDates.map(({ id, hired, fired }) => {
                      return (
                        <option value={id} key={id}>
                          {dateFns.format(hired)}/{dateFns.format(fired)}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <Button
                  mr={3}
                  colorScheme="blue"
                  variant="outline"
                  isLoading={hiredateId === null ? true : false}
                  spinner={<Indicator loadingItem />}
                  onClick={updateClickHireDate}
                >
                  Update
                </Button>
                <Button
                  mr={3}
                  colorScheme="blue"
                  variant="outline"
                  isLoading={hiredateId === null ? true : false}
                  spinner={<Indicator loadingItem />}
                  onClick={removeClickHireDate}
                >
                  Remove
                </Button>
              </GridItem>
              <GridItem {...styles.list}>
                <List
                  spacing={'0.5'}
                  display={'flex'}
                  flexDirection={'column'}
                  width={'full'}
                  justifyContent={'start'}
                  alignItems={'start'}
                  gap={'.1rem'}
                >
                  {getHireDate?.data?.hireDates.map(({ id, ...data }) => {
                    return <Item key={id} {...data} />;
                  })}
                </List>
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
