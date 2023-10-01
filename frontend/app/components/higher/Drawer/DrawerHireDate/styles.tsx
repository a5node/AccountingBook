import { GridItemProps, GridProps } from '@chakra-ui/react';

export const wrap: GridProps = {
  templateAreas: `"create list list"
                  "footer list list"`,
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '3fr 70px',
  gap: '2rem',
  minH: 'full',
  width: 'full',
};

export const create: GridItemProps = { as: 'div', area: 'create' };
export const list: GridItemProps = { as: 'div', area: 'list', width: '100%' };
export const footer: GridItemProps = { as: 'div', area: 'footer' };
