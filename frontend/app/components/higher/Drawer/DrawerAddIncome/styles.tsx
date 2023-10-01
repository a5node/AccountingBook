import { GridItemProps, GridProps } from '@chakra-ui/react';

export const wrap: GridProps = {
  templateAreas: `"employee employee body"
                  "footer footer footer"`,
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '3fr 70px',
  gap: '0.5rem',
  minH: 'full',
  width: 'full',
};

export const employee: GridItemProps = { as: 'div', area: 'employee' };
export const body: GridItemProps = { as: 'div', area: 'body' };
export const footer: GridItemProps = { as: 'div', area: 'footer' };

export const wrapSelect: GridProps = {
  templateAreas: `"header header "
                  "employee project"`,
  gridTemplateColumns: '1fr 1fr',
  gap: '0.5rem',
  width: 'full',
};

export const selectHeader: GridItemProps = { as: 'div', area: 'header' };
export const selectEmployee: GridItemProps = { as: 'div', area: 'employee' };
export const selectProject: GridItemProps = { as: 'div', area: 'project' };
