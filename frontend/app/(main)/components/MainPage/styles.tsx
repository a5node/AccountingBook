import { GridItemProps, GridProps } from '@chakra-ui/react';

export const wrap: GridProps = {
  templateAreas: `"from to"
                  "income expenditure"`,
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '70px 1fr',
  minW: 'full',
  height: 'full',
  gap: '1rem',
};

export const from: GridItemProps = {
  as: 'div',
  area: 'from',
  display: 'grid',
  alignSelf: 'flex-start',
  justifySelf: 'center',
  gap: '.2rem',
};

export const to: GridItemProps = {
  as: 'div',
  area: 'to',
  display: 'grid',
  alignSelf: 'flex-start',
  justifySelf: 'center',
  gap: '.2rem',
};
export const base: GridItemProps = {
  as: 'div',
  area: 'income',
  display: 'grid',
  alignSelf: 'flex-start',
  gap: '.2rem',
};

export const currencies: GridItemProps = {
  as: 'div',
  area: 'expenditure',
  display: 'grid',
  alignSelf: 'flex-start',
  gap: '.2rem',
};
