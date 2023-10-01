import { GridItemProps, GridProps } from '@chakra-ui/react';

export const wrap: GridProps = {
  templateAreas: `"user profile employee"
                  "footer footer footer"`,
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '3fr 70px',
  gap: '0.5rem',
  minH: 'full',
  width: 'full',
};

export const user: GridItemProps = { as: 'div', area: 'user' };
export const profile: GridItemProps = { as: 'div', area: 'profile' };
export const employee: GridItemProps = { as: 'div', area: 'employee' };
export const footer: GridItemProps = { as: 'div', area: 'footer' };
