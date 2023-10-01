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
  IconButton,
  useBoolean,
  Select,
  useToast,
} from '@chakra-ui/react';
import { HiOutlineCloudArrowDown } from 'react-icons/hi2';

import { RolesRowUpdateProps } from './props';
import { Btn, Indicator } from '@app/components';
import { useFindManyRoles, useAddUserRole, useRemoveUserRole } from '@hooks/user';

export const RolesRowUpdate: React.FC<RolesRowUpdateProps> = ({ id }): JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [flag, setFlag] = useBoolean();
  const { data, isLoading: isLoadingRoles, error } = useFindManyRoles();
  const { data: dataAdd, error: errorAdd, add, reset } = useAddUserRole();
  const { data: dataRemove, error: errorRemove, remove, reset: resetRemove } = useRemoveUserRole();
  const toast = useToast();

  const [role, setRole] = useState<number | null>(null);

  const handlerAdd = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault();
    setFlag.on();
    if (role === null) return;
    await add({ userId: id, roleId: role });
    setRole(null);
  };

  const handlerRemove = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault();
    setFlag.on();
    if (role === null) return;
    remove({ userId: id, roleId: role });
  };

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (errorAdd) {
      const msg = errorAdd && errorAdd instanceof Error ? errorAdd.message : errorAdd.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (errorRemove) {
      const msg = errorRemove && errorRemove instanceof Error ? errorRemove.message : errorRemove.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
    if (dataAdd) toast({ title: 'Role added', status: 'success', duration: 1000, isClosable: true });
    if (!dataAdd && dataAdd !== null) {
      toast({ title: 'Role is not add', status: 'error', duration: 1000, isClosable: true });
    }
    if (dataRemove) toast({ title: 'Role remove', status: 'success', duration: 1000, isClosable: true });
    if (!dataRemove && dataRemove !== null) {
      toast({ title: 'Role is not remove', status: 'error', duration: 1000, isClosable: true });
    }
  }, [error, errorAdd, errorRemove, dataAdd, dataRemove]);

  if (isLoadingRoles) return <Indicator loadingItem />;
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
      <PopoverContent
        p={5}
        borderColor={
          flag ? ((dataAdd !== null && dataAdd) || (dataRemove !== null && dataRemove) ? 'green.500' : 'red.500') : ''
        }
      >
        <FormControl marginBottom={'.5rem'}>
          <FormLabel htmlFor="role">Role</FormLabel>
          <Select
            id="role"
            placeholder={'Select roles'}
            onChange={e => {
              setFlag.off();
              if (errorAdd || dataAdd) reset();
              if (errorRemove || dataRemove) resetRemove();
              if (e.target.value) setRole(Number(e.target.value));
            }}
          >
            {data?.map(({ role, id }) => {
              return (
                <option key={id} value={id}>
                  {role.toLowerCase()}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <PopoverFooter display={'flex'} gap={'1.5rem'} justifyContent={'center'} alignItems={'center'}>
          <Btn onClick={handlerRemove} variant="outline" width={'100px'}>
            Remove
          </Btn>
          <Btn onClick={handlerAdd} variant="outline" width={'100px'}>
            Add
          </Btn>
          <Btn variant="outline" onClick={onClose} width={'100px'}>
            Close
          </Btn>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
