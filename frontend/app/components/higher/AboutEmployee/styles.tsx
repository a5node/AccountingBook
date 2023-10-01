import { GridItemProps, GridProps } from '@chakra-ui/react';

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
