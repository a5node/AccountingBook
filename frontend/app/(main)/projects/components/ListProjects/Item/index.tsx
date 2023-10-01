'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ListItem, ListIcon, Text, Flex } from '@chakra-ui/react';
import { HiMiniCog6Tooth, HiMiniCube, HiOutlineTrash } from 'react-icons/hi2';

import { ProjectsItemProps } from './props';
import { BtnIcon } from '@app/components';

import { useIdsStore } from '@store/ids';
import { useDeleteProject } from '@hooks/project';
import { useToggleStore } from '@store/toggles';

export const ItemProjects: React.FC<ProjectsItemProps> = ({ children, project }): JSX.Element => {
  const router = useRouter();
  const { setReloadProjects } = useToggleStore();
  const { setProjectId } = useIdsStore();
  const { remove } = useDeleteProject();

  const redirectToSearchResults = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setProjectId.add(project.id);
    router.push(`/projects/project`);
  };

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    remove({ id: project.id });
    setProjectId.remove();
    setReloadProjects.on();
    router.push(`/projects`);
  };

  const isStart = project.isStart;
  const isEnd = project.isEnd;
  const workers = project.workers.length;

  return (
    <ListItem
      width={'full'}
      display={'grid'}
      gridTemplateColumns={!isStart && !isEnd ? '50px 1fr 50px 50px' : '50px 1fr 50px'}
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
        as={HiMiniCube}
        color={isStart ? 'green.500' : isEnd ? 'orange.500' : 'red.500'}
        width={'25px'}
        height={'25px'}
      />

      <Flex gap={'1rem'}>
        <Text fontSize="lg">{project.name}</Text>
        <Text fontSize="lg" marginLeft={'auto'} marginRight={'1rem'}>
          {project.customer}
        </Text>
        <Text fontSize="lg" marginRight={!isStart && !isEnd ? '18px' : '75px'}>
          {isEnd && <>worked: {workers}</>}
          {isStart && <>working: {workers}</>}
          {!isStart && !isEnd && <>no workers</>}
        </Text>
      </Flex>

      <BtnIcon
        width="30px"
        height="30px"
        fontSize="20px"
        aria-label="update"
        icon={<HiMiniCog6Tooth />}
        onClick={redirectToSearchResults}
      />
      {!isStart && !isEnd && (
        <BtnIcon
          width="30px"
          height="30px"
          fontSize="20px"
          aria-label="delete"
          icon={<HiOutlineTrash />}
          onClick={deleteHandler}
        />
      )}
      {children}
    </ListItem>
  );
};
