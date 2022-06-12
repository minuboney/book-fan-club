import React, { FC } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

interface HeaderProps {
  title: string;
  metaName: string;
  metaContent: string;
}

const Header: FC<HeaderProps> = (props): JSX.Element => {
  const { title, metaName, metaContent } = { ...props };

  return (
    <Head>
      <title>{title}</title>
      <meta name={metaName} content={metaContent} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Header;
