import { GridItemProps, GridProps } from '@chakra-ui/react';
import { BaseLayoutStyles } from '@app/components/styles';

const wrap: GridProps = {
  ...BaseLayoutStyles.wrap,
  templateAreas: `"header header header"
                  "nav main main"
                  "nav footer footer"`,
};

const header: GridItemProps = {
  ...BaseLayoutStyles.header,
};

const nav: GridItemProps = {
  ...BaseLayoutStyles.nav,
};

const main: GridItemProps = {
  ...BaseLayoutStyles.main,
};
const footer: GridItemProps = {
  ...BaseLayoutStyles.footer,
};

export const MainLayoutStyles = {
  wrap,
  header,
  nav,
  main,
  footer,
};
