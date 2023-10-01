import { GridItemProps, GridProps } from '@chakra-ui/react';

const wrap: GridProps = {
  templateAreas: `"header header header"
                  "nav main main"
                  "nav footer footer"`,
  gridTemplateRows: '50px 1fr 30px',
  gridTemplateColumns: '150px 1fr 1fr',
  minH: '100vh',
  minW: '100vw',
  color: 'blackAlpha.700',
  fontWeight: 'bold',
};

const header: GridItemProps = {
  as: 'header',
  area: 'header',
  borderBottom: '1px solid rgb(0, 0, 0)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'end',
  gap: '.7rem',
  padding: '0 .5rem',
  paddingRight: '2rem',
};

const nav: GridItemProps = {
  as: 'nav',
  area: 'nav',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid rgb(0, 0, 0)',
  gap: '5px',
  padding: '.5rem',
};
const main: GridItemProps = {
  as: 'main',
  area: 'main',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '.5rem',
};
const footer: GridItemProps = {
  as: 'footer',
  area: 'footer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '.5rem',
};

export const BaseLayoutStyles = {
  wrap,
  header,
  nav,
  main,
  footer,
};
