import { GridItemProps, GridProps } from '@chakra-ui/react';

export const wrap: GridProps = {
  templateAreas: `"project date"
                  "footer footer"`,
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '3fr 70px',
  gap: '0.5rem',
  minH: 'full',
  width: 'full',
};

export const project: GridItemProps = { as: 'div', area: 'project' };
export const date: GridItemProps = { as: 'div', area: 'date' };
export const footer: GridItemProps = { as: 'div', area: 'footer' };
