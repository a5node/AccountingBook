import { GridItemProps, GridProps } from '@chakra-ui/react';

export const wrap: GridProps = {
  templateAreas: `"project work employee"
                  "footer footer footer"`,
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '3fr 70px',
  gap: '0.5rem',
  minH: 'full',
  width: 'full',
};

export const work: GridItemProps = { as: 'div', area: 'work' };
export const project: GridItemProps = { as: 'div', area: 'project' };
export const employee: GridItemProps = { as: 'div', area: 'employee' };
export const footer: GridItemProps = { as: 'div', area: 'footer' };
