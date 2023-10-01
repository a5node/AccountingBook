'use client';
import React, { useEffect, useState } from 'react';
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
  useBoolean,
  useToast,
} from '@chakra-ui/react';

import { HiOutlineCloudArrowDown } from 'react-icons/hi2';

import { ProfileRowUpdateProps } from './props';
import { Btn, Indicator } from '@app/components';
import { useUpdateUserById } from '@hooks/user';

export const ProfileRowUpdate: React.FC<ProfileRowUpdateProps> = ({ id, rowName, label }): JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();
  const [flag, setFlag] = useBoolean();
  const { user, error, isLoading, updateUserProfile } = useUpdateUserById(id);
  const [data, setData] = useState<string | number | null>();

  const handler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault();
    setFlag.on();
    if (data === null) return;
    updateUserProfile({ [rowName]: data });
    setData('');
  };

  useEffect(() => {
    if (user) toast({ title: `${data} updated.`, status: 'success', duration: 1000, isClosable: true });

    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
  }, [error, user]);

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
      <PopoverContent p={5} borderColor={flag ? (user ? 'green.500' : 'red.500') : ''}>
        <FormControl marginBottom={'.5rem'}>
          <FormLabel>{label}</FormLabel>
          <Input
            type="text"
            placeholder="Enter the changes"
            onChange={e => {
              setFlag.off();
              setData(e.target.value);
            }}
          />
        </FormControl>

        <PopoverFooter display={'flex'} gap={'1.5rem'} justifyContent={'center'} alignItems={'center'}>
          <Btn onClick={handler} variant="outline" width={'100px'}>
            {!isLoading ? 'Save' : <Indicator loadingItem />}
          </Btn>
          <Btn variant="outline" onClick={onClose} width={'100px'}>
            Close
          </Btn>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
