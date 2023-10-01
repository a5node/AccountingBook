import { GridItemProps, GridProps } from '@chakra-ui/react';

export const wrap: GridProps = {
  templateAreas: `"body body body"
                  "footer footer footer"`,
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '1fr 70px',
  gap: '0.5rem',
  minH: 'full',
  width: 'full',
};

export const body: GridItemProps = { as: 'div', area: 'body' };
export const footer: GridItemProps = { as: 'div', area: 'footer' };
