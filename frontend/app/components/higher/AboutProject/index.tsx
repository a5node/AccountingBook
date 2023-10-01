'use client';
import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import * as styles from './styles';
import { Props } from './props';
import { ListWork } from '@app/components';
import { DrawerWork } from '../Drawer/DrawerAddWork';

export const AboutProject: React.FC<Props> = ({ project }): JSX.Element => {
  if (!project) return <></>;

  return (
    <Grid {...styles.about}>
      <GridItem {...styles.work}>
        <DrawerWork project={project} text="Workers" />
        <ListWork works={project.workers} />
      </GridItem>
      <GridItem {...styles.payment}></GridItem>
    </Grid>
  );
};
