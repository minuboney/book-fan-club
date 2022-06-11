import React, { Fragment } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Menu } from '../components/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../components/Interface';
import withProtectRoute from '../hoc/withProtectRoute';

const Users: NextPage = () => {
  const { state } = React.useContext(UserContext);
  return (
    <Fragment>
      {state && (
        <div className={styles.container}>
          <Head>
            <title>User Management System</title>
            <meta name="abc book club" content="abc book club" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>User Management System</h1>
            <p className="mt-3">
              <Link href="/">Dashboard</Link> / Users
            </p>
            <div className={styles.grid}>
              state:{state}
              <Menu></Menu>
            </div>
          </main>

          <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              <span className={styles.logo}>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
              </span>
            </a>
          </footer>
        </div>
      )}
    </Fragment>
  );
};

export default withProtectRoute(Users);
