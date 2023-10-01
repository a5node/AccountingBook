import { BaseLayoutStyles } from '@app/components/styles';
import { GridItemProps, GridProps } from '@chakra-ui/react';

const wrap: GridProps = {
  ...BaseLayoutStyles.wrap,
  templateAreas: `"header header header"
                  "main main main"
                  "footer footer footer"`,
};

const header: GridItemProps = {
  ...BaseLayoutStyles.header,
  borderBottom: '1px solid rgb(187, 187, 187)',
  _dark: {
    borderBottom: '1px solid rgb(187, 187, 187)',
  },
};

const main: GridItemProps = {
  ...BaseLayoutStyles.main,
};

const footer: GridItemProps = {
  ...BaseLayoutStyles.footer,
};

export const AuthLayoutStyles = {
  wrap,
  header,
  main,
  footer,
};
