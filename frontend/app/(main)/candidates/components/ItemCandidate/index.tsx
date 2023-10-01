'use client';
import React, { useEffect } from 'react';
import { Heading, Text, Image, Grid, GridItem, Flex, useBoolean, useToast, Link } from '@chakra-ui/react';
import { HiArrowPath, HiMiniCog6Tooth } from 'react-icons/hi2';

import * as styles from './styles';
import { ItemCandidateProps } from './props';
import {
  Indicator,
  BtnIcon,
  UserRowUpdate,
  ProfileRowUpdate,
  EmployeeRowUpdate,
  RolesRowUpdate,
  AddUserLink,
  AboutEmployee,
} from '@app/components';
import { useGetUserById } from '@hooks/user';
import { useUsersContext } from '@app/contexts';
import { useToggleStore } from '@store/toggles';

export const ItemCandidate: React.FC<ItemCandidateProps> = (): JSX.Element => {
  const toast = useToast();
  const { candidate } = useUsersContext();
  const [isSetting, setIsSetting] = useBoolean();
  const {
    toggles: { reloadUser },
    setReloadUser,
  } = useToggleStore();
  const { user, isLoading, getUser, error } = useGetUserById(Number(candidate));

  const reload = () => {
    getUser(Number(candidate));
  };

  useEffect(() => {
    if (reloadUser) {
      reload();
      setReloadUser.off();
    }
  }, [reloadUser]);

  useEffect(() => {
    if (error) {
      const msg = error && error instanceof Error ? error.message : error.payload?.codename;
      toast({ title: msg, status: 'error', duration: 1000, isClosable: true });
    }
  }, [error]);

  if (user === null) return <Indicator loadingItem />;
  const { roles, profile } = user;

  return (
    <Grid {...styles.wrap}>
      <GridItem {...styles.headerWrap}>
        <Grid {...styles.header}>
          <GridItem {...styles.headerItemAvatar}>
            <Flex>
              {isLoading ? (
                <Indicator loadingItem />
              ) : (
                <Image
                  objectFit="cover"
                  src={user?.image ? user.image : 'https://bit.ly/sage-adebayo'}
                  alt="Chakra UI"
                  width={'350px'}
                  height={'350px'}
                  borderRadius={'10px'}
                />
              )}
              {isSetting && user && <UserRowUpdate rowName="image" label="User image" id={user?.id} />}
            </Flex>
          </GridItem>

          <GridItem {...styles.headerItemAbout}>
            <Flex columnGap={'1rem'}>
              {isLoading ? <Indicator loadingItem /> : <Heading size="sm">{`Nick name: ${user?.name}`}</Heading>}
              {isSetting && user && <UserRowUpdate rowName="name" label="User nick name" id={user?.id} />}
            </Flex>
            <Flex columnGap={'1rem'}>
              {isLoading ? <Indicator loadingItem /> : <Text>{`Name: ${user?.profile?.name}`}</Text>}
              {isSetting && user && <ProfileRowUpdate rowName="name" label="User name" id={user?.id} />}
            </Flex>
            <Flex columnGap={'1rem'}>
              {isLoading ? <Indicator loadingItem /> : <Text>{`Surname: ${user?.profile?.surname}`}</Text>}
              {isSetting && user && <ProfileRowUpdate rowName="surname" label="User surname" id={user?.id} />}
            </Flex>
            <Flex columnGap={'1rem'}>
              {isLoading ? <Indicator loadingItem /> : <Text>{`Patronymic: ${user?.profile?.patronymic}`}</Text>}
              {isSetting && user && <ProfileRowUpdate rowName="patronymic" label="User patronymic" id={user?.id} />}
            </Flex>

            <Flex columnGap={'1rem'}>
              {isLoading ? <Indicator loadingItem /> : <Text>{`Position : ${user?.employee?.positionName}`}</Text>}
              {isSetting && user && (
                <EmployeeRowUpdate rowName="positionName" label="User position name" id={user?.id} />
              )}
            </Flex>
            <Flex columnGap={'1rem'}>
              {isLoading ? <Indicator loadingItem /> : <Text>{`Grade: ${user?.employee?.position}`}</Text>}
              {isSetting && user && (
                <EmployeeRowUpdate rowName="position" label="User position name" id={user?.id} select />
              )}
            </Flex>
            <Flex columnGap={'1rem'}>
              {isLoading ? <Indicator loadingItem /> : <Text>{`Main area: ${user?.employee?.mainArea}`}</Text>}
              {isSetting && user && (
                <EmployeeRowUpdate rowName="mainArea" label="User main area" id={user?.id} select />
              )}
            </Flex>
            <Flex columnGap={'1rem'}>
              <Text>{`Roles:`}</Text>
              {roles &&
                roles.length > 0 &&
                roles.map(({ role, id }) => {
                  return <Text key={id}>{`${role}`}</Text>;
                })}
              {isSetting && user && <RolesRowUpdate id={user?.id} />}
            </Flex>
            <Flex columnGap={'1rem'}>
              {isLoading ? (
                <Indicator loadingItem />
              ) : (
                <Text>{`Hired: ${user?.employee?.isHired ? 'Yes' : 'No'}`}</Text>
              )}
            </Flex>
            <Flex columnGap={'1rem'}>
              {isLoading ? (
                <Indicator loadingItem />
              ) : (
                <Text>{`Email: ${user?.email ? user?.email : user?.profile?.email}`}</Text>
              )}
              {isSetting && user && <ProfileRowUpdate rowName="email" label="User email" id={user?.id} />}
            </Flex>
            <Flex columnGap={'1rem'}>
              {isLoading ? <Indicator loadingItem /> : <Text>{`Phone: ${user?.profile?.phone}`}</Text>}
              {isSetting && user && <ProfileRowUpdate rowName="phone" label="User phone" id={user?.id} />}
            </Flex>

            <Flex columnGap={'1rem'}>
              <Text>Links:</Text>
              {profile?.links &&
                profile?.links.length > 0 &&
                profile?.links.map(({ name, url, id }) => {
                  return (
                    <Link key={id} href={url} isExternal size={'0.5rem'}>
                      {name}
                    </Link>
                  );
                })}
              {isSetting && user && <AddUserLink id={user.id} />}
            </Flex>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem {...styles.bodyWrap}>
        <AboutEmployee roles={user.roles} employee={user.employee} />
      </GridItem>
      <GridItem {...styles.settingWrap}>
        <BtnIcon
          width="40px"
          height="40px"
          fontSize="25px"
          aria-label="update user"
          icon={<HiMiniCog6Tooth />}
          onClick={setIsSetting.toggle}
        />
        <BtnIcon
          width="40px"
          height="40px"
          fontSize="30px"
          aria-label="reload"
          icon={<HiArrowPath />}
          onClick={reload}
        />
      </GridItem>
    </Grid>
  );
};
