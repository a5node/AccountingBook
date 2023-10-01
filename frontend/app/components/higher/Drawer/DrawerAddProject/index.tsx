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

import { Btn } from '@app/components';
import { useAddProject } from '@hooks/project';
import * as styles from './styles';
import { AddProjectForm } from './interface';
import { useToggleStore } from '@store/toggles';

export const DrawerAddProject = (): JSX.Element => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { add, reset: resetUser, error, data } = useAddProject();
  const { setReloadProjects } = useToggleStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddProjectForm>();

  const onSubmit = async (data: AddProjectForm) => {
    add(data);
    reset();
    resetUser();
    setReloadProjects.on();
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
      <Btn onClick={onOpen}>add project</Btn>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a new project</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
              <Grid {...styles.wrap}>
                <GridItem {...styles.project}>
                  <FormControl isInvalid={!!errors?.name?.message}>
                    <FormLabel>Project name</FormLabel>
                    <Input
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'Enter the correct name.',
                        },
                      })}
                      type="text"
                      placeholder="Enter project name"
                    />
                    <FormErrorMessage>{errors && <>{errors.name?.message}</>}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.customer?.message}>
                    <FormLabel>Project customer</FormLabel>
                    <Input
                      {...register('customer', {
                        required: {
                          value: true,
                          message: 'Enter the correct customer.',
                        },
                      })}
                      type="text"
                      placeholder="Enter project customer"
                    />
                    <FormErrorMessage>{errors && <>{errors.customer?.message}</>}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem {...styles.buttons}>
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
