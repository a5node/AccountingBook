'use client';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { Link } from './linkThemes';
import { Button } from './buttonThem';
import { Heading } from './headingThem';

const fonts = {
  body: 'system-ui, sans-serif',
  heading: 'Georgia, serif',
  mono: 'Menlo, monospace',
};
const components = { Link, Button, Heading };
// const colors = {};
// const fontSizes = {};
// const fontWeights = {};
// const lineHeights = {};
// const letterSpacings = {};
// const breakpoints = {};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// https://chakra-ui.com/docs/styled-system/theme
export const theme = extendTheme({
  config,
  components,
  fonts,
  // colors,
  // fontSizes,
  // fontWeights,
  // lineHeights,
  // letterSpacings,
  // breakpoints,
});
