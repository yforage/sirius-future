import React from 'react';
import type { AppProps } from 'next/app';
import { css, Global } from '@emotion/react';

const circeRegular = css({
  '@font-face': {
    fontFamily: 'Circe Rounded',
    src: "url('/fonts/CirceRounded/CirceRounded-Regular.otf') format('opentype')",
    fontWeight: 'regular',
  },
});

const circeExtraBold = css({
  '@font-face': {
    fontFamily: 'Circe Rounded',
    src: "url('/fonts/CirceRounded/CirceRounded-Alt-ExtraBold.otf') format('opentype')",
    fontWeight: '800',
  },
});

const helvetica = css({
  '@font-face': {
    fontFamily: 'Helvetica',
    src: "url('/fonts/Helvetica/Helvetica.ttf') format('truetype')",
    fontWeight: '400',
  },
});

const helveticaBold = css({
  '@font-face': {
    fontFamily: 'Helvetica',
    src: "url('/fonts/Helvetica/Helvetica-Bold.ttf') format('truetype')",
    fontWeight: '700',
  },
});

const calibriRegular = css({
  '@font-face': {
    fontFamily: 'Calibri',
    src: "url('/fonts/Calibri/Calibri-Regular.ttf') format('truetype')",
    fontWeight: '400',
  },
});

const globalCss = css({
  button: {
    border: 'none',
    fontWeight: 'inherit',
    fontFamily: 'inherit',
    cursor: 'pointer',
    fontSize: 'inherit',
  },
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  'datalist > option': {
    fontWeight: 'inherit',
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Global styles={[globalCss, circeRegular, circeExtraBold, helvetica, helveticaBold, calibriRegular]} />
    <Component {...pageProps} />
  </>
);

export default App;
