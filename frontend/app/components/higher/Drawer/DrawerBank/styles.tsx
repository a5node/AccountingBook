import { GridItemProps, GridProps } from '@chakra-ui/react';

export const wrap: GridProps = {
  templateAreas: `"main list list"
                  "footer footer footer"`,
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '3fr 70px',
  gap: '0.5rem',
  minH: 'full',
  width: 'full',
};

export const main: GridItemProps = { as: 'div', area: 'main' };
export const list: GridItemProps = { as: 'div', area: 'list' };
export const footer: GridItemProps = { as: 'div', area: 'footer' };
