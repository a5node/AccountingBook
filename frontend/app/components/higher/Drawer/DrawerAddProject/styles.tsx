import { GridItemProps, GridProps } from '@chakra-ui/react';

export const wrap: GridProps = {
  templateAreas: `"project"
                  "buttons"`,
  gridTemplateColumns: '1fr',
  gridTemplateRows: '3fr 70px',
  gap: '0.5rem',
  minH: 'full',
  width: 'full',
};

export const project: GridItemProps = { as: 'div', area: 'project' };
export const buttons: GridItemProps = { as: 'div', area: 'buttons' };
