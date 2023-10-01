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

import { Btn, SelectMainArea, SelectPositions, SelectRoles, SelectYesNo } from '@app/components';
import { useAddUser } from '@hooks/user';
import * as styles from './styles';
import { AddUserForm } from './interface';
import { useToggleStore } from '@store/toggles';

export const DrawerAddUser = (): JSX.Element => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setReloadUsers } = useToggleStore();
  const { addUser, reset: resetUser, error, user } = useAddUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserForm>();

  const onSubmit = async ({
    nick,
    name,
    email,
    role,
    photo,
    phone,
    age,
    cvUrl,
    patronymic,
    surname,
    isHired,
    position,
    positionName,
    mainArea,
  }: AddUserForm) => {
    addUser({
      name: nick,
      email,
      image: photo,
      profile: {
        email,
        photo,
        phone,
        age: Number(age),
        cvUrl,
        name,
        patronymic,
        surname,
      },
      employee: {
        isHired: isHired === 'yes' ? true : false,
        positionName,
        position: JSON.parse(position).name,
        mainArea: JSON.parse(mainArea).name,
      },
      role: JSON.parse(role),
    });
    reset();
    resetUser();
    setReloadUsers.on();
  };

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (user) toast({ title: 'User added.', status: 'success', duration: 1000, isClosable: true });
  }, [error, user]);

  return (
    <>
      <Btn onClick={onOpen}>add person</Btn>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a new person</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
              <Grid {...styles.wrap}>
                <GridItem {...styles.user}>
                  <FormControl isInvalid={!!errors?.name?.message}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'Enter the correct name.',
                        },
                      })}
                      type="text"
                      placeholder="Enter your name"
                    />
                    <FormErrorMessage>{errors && <>{errors.name?.message}</>}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.patronymic?.message}>
                    <FormLabel>Patronymic</FormLabel>
                    <Input
                      {...register('patronymic', {
                        required: {
                          value: true,
                          message: 'Enter the correct patronymic.',
                        },
                      })}
                      type="text"
                      placeholder="Enter your patronymic"
                    />
                    <FormErrorMessage>{errors && <>{errors.patronymic?.message}</>}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.surname?.message}>
                    <FormLabel>Surname</FormLabel>
                    <Input
                      {...register('surname', {
                        required: {
                          value: true,
                          message: 'Enter the correct surname.',
                        },
                      })}
                      type="text"
                      placeholder="Enter your surname"
                    />
                    <FormErrorMessage>{errors && <>{errors.surname?.message}</>}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.email?.message}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...register('email', {
                        required: {
                          value: true,
                          message: 'Enter the correct email.',
                        },
                      })}
                      type="email"
                      placeholder="Enter your email"
                    />
                    <FormErrorMessage>{errors && <>{errors.email?.message}</>}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.age?.message}>
                    <FormLabel>Age</FormLabel>
                    <Input
                      {...register('age', {
                        required: {
                          value: true,
                          message: 'Enter the correct age.',
                        },
                      })}
                      type="number"
                      placeholder="Enter your age"
                    />
                    <FormErrorMessage>{errors && <>{errors.age?.message}</>}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.phone?.message}>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      {...register('phone', {
                        required: {
                          value: true,
                          message: 'Enter the correct phone.',
                        },
                      })}
                      type="tel"
                      placeholder="Enter your phone"
                    />
                    <FormErrorMessage>{errors && <>{errors.phone?.message}</>}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem {...styles.profile}>
                  <FormControl isInvalid={!!errors?.nick?.message}>
                    <FormLabel>Nick name</FormLabel>
                    <Input
                      {...register('nick', {
                        required: {
                          value: true,
                          message: 'Enter the correct nickname.',
                        },
                      })}
                      type="text"
                      placeholder="Enter your nickname"
                    />
                    <FormErrorMessage>{errors && <>{errors.nick?.message}</>}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.positionName?.message}>
                    <FormLabel>Position Name</FormLabel>
                    <Input
                      {...register('positionName', {
                        required: {
                          value: true,
                          message: 'Enter the correct position name.',
                        },
                      })}
                      type="text"
                      placeholder="NodeJs + React"
                    />
                    <FormErrorMessage>{errors && <>{errors.positionName?.message}</>}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.photo?.message}>
                    <FormLabel>Photo</FormLabel>
                    <Input
                      {...register('photo', {
                        required: {
                          value: true,
                          message: 'Enter the correct url photo.',
                        },
                      })}
                      type="url"
                      placeholder="Enter your url photo"
                    />
                    <FormErrorMessage>{errors && <>{errors.photo?.message}</>}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.cvUrl?.message}>
                    <FormLabel>CV</FormLabel>
                    <Input
                      {...register('cvUrl', {
                        required: {
                          value: true,
                          message: 'Enter the correct cv url.',
                        },
                      })}
                      type="url"
                      placeholder="Enter your cv url"
                    />
                    <FormErrorMessage>{errors && <>{errors.cvUrl?.message}</>}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem {...styles.employee}>
                  <SelectYesNo register={register} name={'isHired'} errors={errors.isHired?.message} label={'Hired'} />
                  <SelectRoles register={register} name={'role'} errors={errors.role?.message} />
                  <SelectPositions register={register} name={'position'} errors={errors.position?.message} />
                  <SelectMainArea register={register} name={'mainArea'} errors={errors.mainArea?.message} />
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
