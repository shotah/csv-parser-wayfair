import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="cntr-footer">
      <Link href="/">
        <>
          Powered by{' '}
          <Image
            src="/favicon_finder_logo.svg"
            alt="Favicon Finder Logo"
            className="sml-logo"
            width="50"
            height="50"
          />
        </>
      </Link>
    </footer>
  );
}
