'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ListItem, ListIcon, Text, Flex } from '@chakra-ui/react';
import { HiOutlineTrash, HiMiniUser, HiMiniUserPlus, HiMiniUserMinus } from 'react-icons/hi2';

import { UsersItemProps } from './props';
import { Btn, BtnIcon } from '@app/components';
import { useUsersContext } from '@app/contexts';
import { useDeleteUserById } from '@hooks/user';
import { useToggleStore } from '@store/toggles';

export const ItemPersons: React.FC<UsersItemProps> = ({ children, person }): JSX.Element => {
  const router = useRouter();
  const { setPerson } = useUsersContext();
  const { deleteUser } = useDeleteUserById();
  const { setReloadUsers } = useToggleStore();

  const redirectToSearchResults = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setPerson(person.id);
    router.push(`/people/person`);
  };

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    deleteUser(person.id);
    setReloadUsers.on();
    router.push(`/people`);
  };

  const isUser = person.roles?.find(({ role }) => role === 'USER');

  const isHaired = person.employee?.isHired;

  return (
    <ListItem
      width={'full'}
      display={'grid'}
      gridTemplateColumns={'50px 1fr 100px 50px'}
      gridTemplateRows={'50px'}
      columnGap={'0.5rem'}
      justifyContent={'start'}
      alignItems={'center'}
      boxShadow={'0px 1px 3px -1px rgba(0,0,0,0.82)'}
      border={'1px solid'}
      borderColor={'blackAlpha.200'}
      borderRadius={'5px'}
    >
      <ListIcon
        as={isUser ? HiMiniUser : isHaired ? HiMiniUserPlus : HiMiniUserMinus}
        color="green.500"
        width={'25px'}
        height={'25px'}
      />

      <Flex gap={'1rem'}>
        <Text fontSize="lg">{person.name}</Text>
        <Text fontSize="lg">{person.employee?.positionName}</Text>
        <Text fontSize="lg" marginLeft={'auto'} marginRight={'1rem'}>
          {person.employee?.position}
        </Text>
      </Flex>

      <Btn onClick={redirectToSearchResults}> About</Btn>

      <BtnIcon
        width="30px"
        height="30px"
        fontSize="20px"
        aria-label="delete"
        icon={<HiOutlineTrash />}
        onClick={deleteHandler}
      />
      {children}
    </ListItem>
  );
};
