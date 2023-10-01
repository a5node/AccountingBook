'use client';
import { Grid, GridItem } from '@chakra-ui/react';

import { MainLayoutStyles } from './styles';
import { useUserContext } from '@app/contexts';

import { DrawerAddCurrency, DrawerAddExpenditure, H } from '@app/components';

import { AddRolesForm } from '../AddRolesForm';
import { AddPositionForm } from '../AddPositionForm';
import { AddMainAreaForm } from '../AddMainAreaForm';
import { RemoveMainAreaForm } from '../RemoveMainAreaForm';
import { RemovePositionForm } from '../RemovePositionForm';
import { RemoveRolesForm } from '../RemoveRoleForm';

export const SettingPage = (): JSX.Element => {
  const { userRole } = useUserContext();
  return (
    <Grid {...MainLayoutStyles.wrap}>
      <GridItem {...MainLayoutStyles.acc}>
        <H as="h4" size={'1rem'}>
          Accounting
        </H>
        <DrawerAddCurrency />
        <DrawerAddExpenditure />
      </GridItem>
      <GridItem {...MainLayoutStyles.header}>
        <H size={'1rem'}>{userRole}</H>
      </GridItem>
      <GridItem {...MainLayoutStyles.add}>
        <H size={'1rem'}>Add value</H>
        <AddRolesForm />
        <AddMainAreaForm />
        <AddPositionForm />
      </GridItem>
      <GridItem {...MainLayoutStyles.remove}>
        <H size={'1rem'}>Remove value</H>
        <RemoveRolesForm />
        <RemoveMainAreaForm />
        <RemovePositionForm />
      </GridItem>
      <GridItem {...MainLayoutStyles.update}>
        <H size={'1rem'}>Update value</H>
      </GridItem>
    </Grid>
  );
};
