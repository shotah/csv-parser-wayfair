import '../style/index.css';
import React from 'react';
import { SSRProvider } from '@react-aria/ssr';
import PropTypes from 'prop-types';
import { RecoilRoot } from 'recoil';
import Header from '../components/header';
import Footer from '../components/footer';

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};

export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <RecoilRoot>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </RecoilRoot>
    </SSRProvider>
  );
}
