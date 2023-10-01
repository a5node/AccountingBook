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
import { ProjectForm } from './interface';
import { Props } from './props';
import { Btn, BtnIcon, SelectCurrencies } from '@app/components';

import { useUpdateProject } from '@hooks/project';
import { useIdsStore } from '@store/ids';
import { useToggleStore } from '@store/toggles';
import { TUpdateProjectCommandReq } from '@interface/contracts.types';

export const DrawerUpdateProject: React.FC<Props> = ({ project }): JSX.Element => {
  const toast = useToast();
  const { setReloadProject } = useToggleStore();
  const {
    ids: { projectId },
  } = useIdsStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { update, reset: resetProject, error, data } = useUpdateProject();

  const { register, handleSubmit, reset } = useForm<ProjectForm>();

  const onSubmit = async ({
    price,
    hours,
    name,
    customer,
    link,
    repositoryUrl,
    start,
    end,
    currencyName,
  }: ProjectForm) => {
    let id: number = -1;
    if (!projectId) return;
    if (project?.id) id = project.id;
    if (id === -1) return;
    const payload: TUpdateProjectCommandReq = { id };

    if (currencyName) payload.currencyId = JSON.parse(currencyName).id;

    if (price) payload.price = price;
    if (hours) payload.hours = hours;
    if (name) payload.name = name;
    if (customer) payload.customer = customer;
    if (link) payload.link = link;
    if (repositoryUrl) payload.repositoryUrl = repositoryUrl;
    if (start) {
      payload.start = start;
      payload.end = null;
    }
    if (end) payload.end = end;

    update(payload);
    reset();
    resetProject();
    setReloadProject.on();
  };

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (data) toast({ title: 'Project updated.', status: 'success', duration: 1000, isClosable: true });
  }, [error, data]);

  const handlerStart = () => {
    update({ id: project.id, isStart: true });
  };
  const handlerEnd = () => {
    update({ id: project.id, isEnd: true });
  };

  return (
    <>
      <BtnIcon
        width="40px"
        height="40px"
        fontSize="25px"
        aria-label="update project"
        icon={<HiMiniCog6Tooth />}
        onClick={onOpen}
      />
      <Btn onClick={handlerStart}>Start</Btn>
      <Btn onClick={handlerEnd}>End</Btn>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Status of project</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
              <Grid {...styles.wrap}>
                <GridItem {...styles.project}>
                  <SelectCurrencies register={register} name="currencyName" required />
                  <FormControl>
                    <FormLabel>Project cost: {data ? data.price : project?.price}</FormLabel>
                    <Input {...register('price')} type="number" placeholder="Enter new price" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Time for work: {data ? data.hours : project?.hours}</FormLabel>
                    <Input {...register('hours')} type="number" placeholder="Enter new hours" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Project name: {data ? data.name : project?.name}</FormLabel>
                    <Input {...register('name')} type="text" placeholder="Enter new name" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Customer name: {data ? data.customer : project?.customer}</FormLabel>
                    <Input {...register('customer')} type="text" placeholder="Enter new customer" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Project link: {data ? data.link : project?.link}</FormLabel>
                    <Input {...register('link')} type="url" placeholder="Enter new link" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Repository link: {data ? data.repositoryUrl : project?.repositoryUrl}</FormLabel>
                    <Input {...register('repositoryUrl')} type="url" placeholder="Enter new repository url" />
                  </FormControl>
                </GridItem>
                <GridItem {...styles.date}>
                  <FormControl>
                    <FormLabel>
                      The start date: {data ? data.start?.toUTCString() : project?.start?.toUTCString()}
                    </FormLabel>
                    <Input {...register('start')} type="date" placeholder="Enter date when start" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>The end date: {data ? data.end?.toUTCString() : project?.end?.toUTCString()}</FormLabel>
                    <Input {...register('end')} type="datetime" placeholder="Enter date when stop" />
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
