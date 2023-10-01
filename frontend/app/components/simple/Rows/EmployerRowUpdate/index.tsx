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
  Select,
  useToast,
} from '@chakra-ui/react';

import { HiOutlineCloudArrowDown } from 'react-icons/hi2';

import { EmployeeRowUpdateProps } from './props';
import { Btn, Indicator } from '@app/components';
import { useUpdateUserById, useFindManyMainArea, useFindManyPositions } from '@hooks/user';

export const EmployeeRowUpdate: React.FC<EmployeeRowUpdateProps> = ({ id, rowName, label, select }): JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();
  const [flag, setFlag] = useBoolean();
  const { data: mainareaData } = useFindManyMainArea();
  const { data: positionsData } = useFindManyPositions();

  const { user, error, isLoading, updateUserEmployee } = useUpdateUserById(id);

  const [data, setData] = useState<string | null>(null);

  const handler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault();
    setFlag.on();
    if (data === null) return;
    const role = user?.roles?.find(({ role }) => role === 'CANDIDATE');

    if (rowName === 'position') {
      updateUserEmployee(role ? role.role : '', { position: data });
      return;
    }
    if (rowName === 'mainArea') {
      updateUserEmployee(role ? role.role : '', { mainArea: data });
      return;
    }

    updateUserEmployee(role ? role.role : '', { [rowName]: data });
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
        {!select && (
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
        )}

        {select && rowName === 'position' && (
          <FormControl>
            <FormLabel htmlFor="position">Position</FormLabel>
            <Select
              id="position"
              placeholder={'Select position'}
              onChange={e => {
                setFlag.off();
                if (e.target.value) setData(e.target.value);
              }}
            >
              {positionsData?.map(({ name, id }) => {
                return (
                  <option key={id} value={name}>
                    {name.toLowerCase()}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        )}

        {select && rowName === 'mainArea' && (
          <FormControl>
            <FormLabel htmlFor="mainArea">Main Area</FormLabel>
            <Select
              id="mainArea"
              placeholder={'Select main area'}
              onChange={e => {
                setFlag.off();
                if (e.target.value) setData(e.target.value);
              }}
            >
              {mainareaData?.map(({ name, id }) => {
                return (
                  <option key={id} value={name}>
                    {name.toLowerCase()}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        )}

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
