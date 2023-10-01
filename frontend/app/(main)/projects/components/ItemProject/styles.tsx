import { GridItemProps, GridProps } from '@chakra-ui/react';

export const wrap: GridProps = {
  templateAreas: `"header header header setting"
                  "body body body body"`,
  gridTemplateRows: '350px 1fr',
  gridTemplateColumns: '1fr 1fr 1fr 50px',
  minW: 'full',
  gap: '1rem',
};

export const headerWrap: GridItemProps = {
  as: 'section',
  area: 'header',
  display: 'grid',
  alignSelf: 'flex-start',
  gap: '.5rem',
};

export const bodyWrap: GridItemProps = {
  as: 'section',
  area: 'body',
  gap: '.5rem',
};

export const settingWrap: GridItemProps = {
  as: 'section',
  area: 'setting',
  display: 'grid',
  alignSelf: 'flex-start',
  justifyItems: 'center',
  gap: '.5rem',
};
