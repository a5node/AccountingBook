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
  Text,
  Flex,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import * as styles from './styles';
import { WorkForm } from './interface';
import { Props } from './props';
import { Btn, SelectPositions, SelectYesNo, SelectEmployees, SelectProject, ListWork } from '@app/components';

import { useAddWork } from '@hooks/work';
import { useToggleStore } from '@store/toggles';

export const DrawerWork: React.FC<Props> = ({ project, employee, text }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { setReloadUser, setReloadProject } = useToggleStore();

  const { add, reset: resetProject, error, data } = useAddWork();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<WorkForm>();

  const onSubmit = async ({
    hours,
    rate,
    position,
    positionName,
    start,
    isWork,
    projectSelect,
    employeeSelect,
  }: WorkForm) => {
    const payload = {
      isWork: isWork === 'yes' ? true : false,
      position: '',
      projectId: -1,
      employeeId: -1,
      hours,
      rate,
      positionName,
      start,
    };

    if (project?.id) payload.projectId = project?.id;
    if (employee?.id) payload.employeeId = employee?.id;

    if (position) {
      const positionName = JSON.parse(position).name;
      payload.position = positionName;
    }
    if (projectSelect) {
      const projectId = JSON.parse(projectSelect).id;
      payload.projectId = projectId;
    }
    if (employeeSelect) {
      const employeeId = JSON.parse(employeeSelect).id;
      payload.employeeId = employeeId;
    }
    if (payload.projectId === -1) {
      return toast({ title: 'Project id not found.', status: 'error', duration: 1000, isClosable: true });
    }
    if (payload.employeeId === -1) {
      return toast({ title: 'Employee id not found.', status: 'error', duration: 1000, isClosable: true });
    }
    if (!payload.position) {
      return toast({ title: 'Position name not found.', status: 'error', duration: 1000, isClosable: true });
    }
    add(payload);
    reset();
    resetProject();

    setReloadProject.on();
    setReloadUser.on();
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
      <Btn aria-label="Add worker" onClick={onOpen}>
        {text ? text : 'Work'}
      </Btn>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add the employee to the project for work.</DrawerHeader>

          <DrawerBody>
            <Grid {...styles.wrap}>
              <GridItem {...styles.project}>
                {project && (
                  <Flex flexDirection={'column'}>
                    <Text fontSize="lg">Project name: {project?.name}</Text>
                    <Text fontSize="lg">Have hours: {project?.hours}</Text>
                    <Text fontSize="lg">Start: {project?.isStart ? 'Yes' : ' No'}</Text>
                    <Text fontSize="lg">End: {project?.isEnd ? 'Yes' : ' No'}</Text>
                    <ListWork works={project?.workers} />
                  </Flex>
                )}
              </GridItem>
              <GridItem {...styles.work}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
                  {!project && (
                    <SelectProject
                      //
                      register={register}
                      name={'projectSelect'}
                      errors={errors.projectSelect?.message}
                      works={employee ? employee?.works : undefined}
                    />
                  )}
                  {!employee && (
                    <SelectEmployees
                      register={register}
                      name={'employeeSelect'}
                      errors={errors.employeeSelect?.message}
                      works={project ? project?.workers : undefined}
                    />
                  )}
                  <FormControl>
                    <FormLabel>Employee rate</FormLabel>
                    <Input {...register('rate')} type="number" placeholder="Enter new price" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Time for work</FormLabel>
                    <Input {...register('hours')} type="number" placeholder="Enter new hours" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Employee position name</FormLabel>
                    <Input {...register('positionName')} type="text" placeholder="Enter position name" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>The start date</FormLabel>
                    <Input {...register('start')} type="datetime-local" placeholder="Enter date when start" />
                  </FormControl>
                  <SelectPositions register={register} name={'position'} errors={errors.position?.message} />
                  <SelectYesNo register={register} name={'isWork'} errors={errors.isWork?.message} label={'isWork'} />
                  <Button colorScheme="blue" type="submit" variant="outline">
                    Save
                  </Button>
                </form>
              </GridItem>
              <GridItem {...styles.employee}>
                {employee && (
                  <Flex flexDirection={'column'}>
                    <Text fontSize="lg">Employee grate: {employee?.position}</Text>
                    <Text fontSize="lg">Employee position name: {employee?.positionName}</Text>
                  </Flex>
                )}
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
