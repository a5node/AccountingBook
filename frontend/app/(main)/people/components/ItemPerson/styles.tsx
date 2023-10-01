import { GridItemProps, GridProps } from '@chakra-ui/react';

export const wrap: GridProps = {
  templateAreas: `"header header header setting"
                  "body body body body"`,
  gridTemplateRows: '350px 1fr 1fr 50px',
  gridTemplateColumns: '350px 1fr',
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

export const header: GridProps = {
  templateAreas: `"avatar about"`,
  gridTemplateRows: '350px 1fr',
  gridTemplateColumns: '350px',
  minW: 'full',
  gap: '1rem',
};

export const headerItemAvatar: GridItemProps = {
  as: 'div',
  area: 'avatar',
};

export const headerItemAbout: GridItemProps = {
  as: 'article',
  area: 'about',
  gap: '.2rem',
};

export const about: GridProps = {
  templateAreas: `"payment work bank hireDate"`,
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  minW: 'full',
  gap: '1rem',
};

export const hireDate: GridItemProps = {
  as: 'div',
  area: 'hireDate',
  display: 'grid',
  alignSelf: 'flex-start',
  gap: '.2rem',
};

export const bank: GridItemProps = {
  as: 'div',
  area: 'bank',
  display: 'grid',
  alignSelf: 'flex-start',
  gap: '.2rem',
};

export const work: GridItemProps = {
  as: 'div',
  area: 'work',
  display: 'grid',
  alignSelf: 'flex-start',
  gap: '.2rem',
};

export const payment: GridItemProps = {
  as: 'div',
  area: 'payment',
  display: 'grid',
  alignSelf: 'flex-start',
  gap: '.2rem',
};
