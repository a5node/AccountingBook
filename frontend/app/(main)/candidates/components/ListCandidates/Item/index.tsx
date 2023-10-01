'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ListItem, ListIcon, Text, Flex } from '@chakra-ui/react';
import { HiOutlineTrash, HiMiniUser, HiMiniUserPlus } from 'react-icons/hi2';

import { CandidateItemProps } from './props';
import { Btn, BtnIcon } from '@app/components';
import { useUsersContext } from '@app/contexts';
import { useDeleteUserById } from '@hooks/user';
import { useIdsStore } from '@store/ids';

export const ItemCandidates: React.FC<CandidateItemProps> = ({ children, candidate }): JSX.Element => {
  const router = useRouter();
  const { setCandidateId } = useIdsStore();

  const { setCandidate } = useUsersContext();
  const { deleteUser } = useDeleteUserById();

  const redirectToSearchResults = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setCandidateId.add(candidate.id);
    setCandidate(candidate.id);
    router.push(`/candidates/candidate`);
  };

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    deleteUser(candidate.id);
    router.push(`/candidates`);
  };

  const isEmployee = candidate.roles?.find(({ role }) => role === 'EMPLOYEE');

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
      <ListIcon as={isEmployee ? HiMiniUserPlus : HiMiniUser} color="green.500" width={'25px'} height={'25px'} />

      <Flex gap={'1rem'}>
        <Text fontSize="lg">{candidate.name}</Text>
        <Text fontSize="lg">{candidate.employee?.positionName}</Text>
        <Text fontSize="lg" marginLeft={'auto'} marginRight={'1rem'}>
          {candidate.employee?.position}
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
