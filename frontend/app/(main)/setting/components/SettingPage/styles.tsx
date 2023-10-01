import { GridItemProps, GridProps } from '@chakra-ui/react';
import { BaseLayoutStyles } from '@app/components/styles';

const wrap: GridProps = {
  ...BaseLayoutStyles.wrap,
  templateAreas: `"header header header header header"
                  "add remove update acc main"`,
  gridTemplateRows: '30px 1fr',
  gridTemplateColumns: '200px 200px 200px 200px 1fr',
  minW: 'full',
  gap: '0.5rem',
};

const base: GridItemProps = {
  as: 'div',
  display: 'grid',
  alignSelf: 'flex-start',
  justifySelf: 'center',
  gap: '0.5rem',
};

const header: GridItemProps = {
  ...base,
  area: 'header',
};

const add: GridItemProps = {
  ...base,
  area: 'add',
};
const remove: GridItemProps = {
  ...base,
  area: 'remove',
};
const update: GridItemProps = {
  ...base,
  area: 'update',
};
const acc: GridItemProps = {
  ...base,
  area: 'acc',
};

const main: GridItemProps = {
  ...base,
  area: 'main',
};

export const MainLayoutStyles = {
  header,
  wrap,
  add,
  remove,
  update,
  acc,
  main,
};
