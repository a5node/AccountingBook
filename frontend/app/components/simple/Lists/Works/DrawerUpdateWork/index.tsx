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
import { DrawerUpdateWorkPropsForm } from './interface';
import { DrawerUpdateWorkProps } from './props';

import { BtnIcon, SelectYesNo, SelectPositions } from '@app/components';
import { useUpdateWork } from '@hooks/work';
import { TUpdateWorkCommandReq } from '@interface/contracts.types';
import { useToggleStore } from '@store/toggles';

export const DrawerUpdateWork: React.FC<DrawerUpdateWorkProps> = ({ work }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { setReloadUser, setReloadProject } = useToggleStore();

  const { update, reset: resetProject, error, data } = useUpdateWork();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<DrawerUpdateWorkPropsForm>();

  const onSubmit = async ({ hours, rate, position, positionName, start, isWork, end }: DrawerUpdateWorkPropsForm) => {
    const payload: Omit<TUpdateWorkCommandReq, 'id'> = {};

    if (position) {
      const positionName = JSON.parse(position).name;
      payload.position = positionName;
    }

    if (hours) payload.hours = hours;
    if (rate) payload.rate = rate;
    if (positionName) payload.positionName = positionName;
    if (start) payload.start = start;
    if (isWork) payload.isWork = isWork === 'yes';
    if (end) payload.end = end;

    if (!work?.id) {
      return toast({ title: 'Work id is not found.', status: 'error', duration: 1000, isClosable: true });
    }

    update({ id: work.id, ...payload });
    setReloadProject.on();
    setReloadUser.on();
    reset();
    resetProject();
  };

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (data) toast({ title: 'Project added.', status: 'success', duration: 1000, isClosable: true });
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
          <DrawerHeader borderBottomWidth="1px">Update worker.</DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
              <Grid {...styles.wrap}>
                <GridItem {...styles.body}>
                  <FormControl>
                    <FormLabel>Employee rate: {work ? work.rate : 0}</FormLabel>
                    <Input {...register('rate')} type="number" placeholder="Enter new price" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Time for work: {work ? work.hours : 0}</FormLabel>
                    <Input {...register('hours')} type="number" placeholder="Enter new hours" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Employee position name: {work ? work?.positionName : ''}</FormLabel>
                    <Input {...register('positionName')} type="text" placeholder="Enter position name" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>The start date: {work ? work.start?.toUTCString() : ''}</FormLabel>
                    <Input {...register('start')} type="datetime-local" placeholder="Enter date when start" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>The end date: {work ? work.start?.toUTCString() : ''}</FormLabel>
                    <Input {...register('end')} type="datetime-local" placeholder="Enter date when start" />
                  </FormControl>
                  <SelectPositions register={register} name={'position'} errors={errors?.position?.message} />
                  <SelectYesNo register={register} name={'isWork'} errors={errors?.isWork?.message} label={'isWork'} />
                  <Button colorScheme="blue" type="submit" variant="outline">
                    Update
                  </Button>
                </GridItem>

                <GridItem {...styles.footer}>
                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
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
