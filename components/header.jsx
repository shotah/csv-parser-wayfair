import React from 'react';
import Head from 'next/head';
import NavBar from './navbar';

export default function Header() {
  return (
    <>
      <Head>
        <title>Favicon Finder</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <NavBar />
    </>
  );
}
