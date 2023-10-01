'use client';
import React, { useEffect } from 'react';
import {
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverFooter,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  useToast,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { HiOutlineCloudArrowDown } from 'react-icons/hi2';

import { Props } from './props';
import { Btn } from '@app/components';
import { useAddUserLink } from '@hooks/user';

export const AddUserLink: React.FC<Props> = ({ id }): JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();

  const { add, reset: reserUserLink, data, error } = useAddUserLink();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ url: string; name: string }>();
  const onSubmit = async (payload: { url: string; name: string }) => {
    add({ userId: id, ...payload });
    reset();
    reserUserLink();
  };

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (data) toast({ title: 'Link added.', status: 'success', duration: 1000, isClosable: true });
  }, [error, data]);

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="right">
      <PopoverTrigger>
        <IconButton
          size="sm"
          width={'1rem'}
          height={'1rem'}
          minWidth={'.9rem'}
          maxWidth={'1rem'}
          aria-label="chang row"
          icon={<HiOutlineCloudArrowDown width={'1rem'} height={'1rem'} size={'1rem'} />}
        />
      </PopoverTrigger>
      <PopoverContent p={5} borderColor={data ? 'green.500' : error ? 'red.500' : 'blackAlpha.300'}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
          <FormControl isInvalid={!!errors?.name?.message}>
            <FormLabel>Link name</FormLabel>
            <Input
              {...register('name', {
                required: {
                  value: true,
                  message: 'Enter the correct link name.',
                },
              })}
              type="text"
              placeholder="Enter link name"
            />
            <FormErrorMessage>{errors && <>{errors.name?.message}</>}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.url?.message}>
            <FormLabel>Link url</FormLabel>
            <Input
              {...register('url', {
                required: {
                  value: true,
                  message: 'Enter the correct link url.',
                },
              })}
              type="text"
              placeholder="Enter link url"
            />
            <FormErrorMessage>{errors && <>{errors.url?.message}</>}</FormErrorMessage>
          </FormControl>

          <PopoverFooter display={'flex'} gap={'1.5rem'} justifyContent={'center'} alignItems={'center'}>
            <Button colorScheme="blue" type="submit" variant="outline">
              Save
            </Button>
            <Btn variant="outline" onClick={onClose} width={'100px'}>
              Close
            </Btn>
          </PopoverFooter>
        </form>
      </PopoverContent>
    </Popover>
  );
};
