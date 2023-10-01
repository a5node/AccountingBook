'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ListItem, ListIcon, Text, Flex } from '@chakra-ui/react';
import { HiMiniUser } from 'react-icons/hi2';

import { EmployerItemProps } from './props';
import { Btn } from '@app/components';
import { useUsersContext } from '@app/contexts';

export const ItemEmployee: React.FC<EmployerItemProps> = ({ children, employee }): JSX.Element => {
  const router = useRouter();
  const { setEmployee } = useUsersContext();

  const redirectToSearchResults = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setEmployee(employee.id);
    router.push(`/employees/employee`);
  };

  return (
    <ListItem
      width={'full'}
      display={'grid'}
      gridTemplateColumns={'50px 1fr 100px'}
      gridTemplateRows={'50px'}
      columnGap={'0.5rem'}
      justifyContent={'start'}
      alignItems={'center'}
      boxShadow={'0px 1px 3px -1px rgba(0,0,0,0.82)'}
      border={'1px solid'}
      borderColor={'blackAlpha.200'}
      borderRadius={'5px'}
    >
      <ListIcon as={HiMiniUser} color={'green.500'} width={'25px'} height={'25px'} />

      <Flex gap={'1rem'}>
        <Text fontSize="lg">{employee.name}</Text>
        <Text fontSize="lg">{employee.employee?.positionName}</Text>
        <Text fontSize="lg" marginLeft={'auto'} marginRight={'1rem'}>
          {employee.employee?.position}
        </Text>
      </Flex>

      <Btn onClick={redirectToSearchResults}>About</Btn>

      {children}
    </ListItem>
  );
};
