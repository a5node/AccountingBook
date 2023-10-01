'use client';
import React, { useEffect } from 'react';
import { Heading, Text, Grid, GridItem, Flex, useToast, Link } from '@chakra-ui/react';
import { HiArrowPath } from 'react-icons/hi2';

import * as styles from './styles';
import { ItemProjectProps } from './props';
import { Indicator, BtnIcon, AboutProject } from '@app/components';

import { useIdsStore } from '@store/ids';
import { useGetProjectById } from '@hooks/project';
import { DrawerUpdateProject } from '@app/components';
import { useToggleStore } from '@store/toggles';

export const ItemProject: React.FC<ItemProjectProps> = (): JSX.Element => {
  const toast = useToast();
  const {
    ids: { projectId },
  } = useIdsStore();
  const {
    toggles: { reloadProject, reloadUser },
    setReloadProject,
    setReloadUser,
  } = useToggleStore();
  const { data, isLoading, get, error } = useGetProjectById();

  const reload = () => {
    if (projectId) get({ id: projectId });
    setReloadProject.off();
    setReloadUser.off();
  };

  useEffect(() => {
    if (projectId) reload();
  }, []);

  useEffect(() => {
    if (projectId) reload();
  }, [reloadProject, reloadUser]);

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
  }, [error]);

  if (data === null) return <Indicator loadingItem />;

  return (
    <Grid {...styles.wrap}>
      <GridItem {...styles.headerWrap}>
        <Flex columnGap={'1rem'}>
          {isLoading ? <Indicator loadingItem /> : <Heading size="sm" margin={'0 auto'}>{`${data?.name}`}</Heading>}
        </Flex>
        <Flex columnGap={'1rem'}>
          {isLoading ? <Indicator loadingItem /> : <Text>{`Customer name: ${data?.customer}`}</Text>}
        </Flex>
        <Flex columnGap={'1rem'}>{isLoading ? <Indicator loadingItem /> : <Text>{`Hours: ${data?.hours}`}</Text>}</Flex>
        <Flex columnGap={'1rem'}>{isLoading ? <Indicator loadingItem /> : <Text>{`Price: ${data?.price}`}</Text>}</Flex>
        <Flex columnGap={'1rem'}>
          {isLoading ? (
            <Indicator loadingItem />
          ) : (
            <Link isExternal href={data.link ? data.link : ''}>{`Project link`}</Link>
          )}
        </Flex>
        <Flex columnGap={'1rem'}>
          {isLoading ? (
            <Indicator loadingItem />
          ) : (
            <Link isExternal href={data.repositoryUrl ? data.repositoryUrl : ''}>{`Repository link`}</Link>
          )}
        </Flex>
        <Flex columnGap={'1rem'}>
          {isLoading ? <Indicator loadingItem /> : <Text>{`Date start project: ${data?.start}`}</Text>}
        </Flex>
        <Flex columnGap={'1rem'}>
          {isLoading ? <Indicator loadingItem /> : <Text>{`Date end project: ${data?.end}`}</Text>}
        </Flex>
        <Flex columnGap={'1rem'}>
          {isLoading ? <Indicator loadingItem /> : <Text>{`Date add project: ${data?.createAt}`}</Text>}
        </Flex>
        <Flex columnGap={'1rem'}>
          {isLoading ? <Indicator loadingItem /> : <Text>{`Is start: ${data?.isStart ? 'Yes' : 'No'}`}</Text>}
        </Flex>
        <Flex columnGap={'1rem'}>
          {isLoading ? <Indicator loadingItem /> : <Text>{`Is end: ${data?.isEnd ? 'Yes' : 'No'}`}</Text>}
        </Flex>
      </GridItem>
      <GridItem {...styles.bodyWrap}>
        <AboutProject project={data} />
      </GridItem>
      <GridItem {...styles.settingWrap}>
        <BtnIcon
          width="40px"
          height="40px"
          fontSize="30px"
          aria-label="reload"
          icon={<HiArrowPath />}
          onClick={() => {
            if (projectId) get({ id: projectId });
          }}
        />
        <DrawerUpdateProject project={data} />
      </GridItem>
    </Grid>
  );
};
