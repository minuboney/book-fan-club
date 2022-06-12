import React, { Fragment } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

import styles from '../styles/Home.module.css';
import { BookManagement } from '../components/Books/BookManagement';
import withProtectRoute from '../hoc/withProtectRoute';
import { RoleContext } from '../components/Interface';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Books: NextPage = () => {
  const { role } = React.useContext(RoleContext);
  return (
    <Fragment>
      {role && (
        <div className={styles.container}>
          <Header
            title="Book Management System"
            metaName="abc book club"
            metaContent="abc book club"
          />
          <main className={styles.main}>
            <h1 className={styles.title}>Welcome to Book Management System</h1>
            <p className="pt-4">
              <Link href="/">Dashboard</Link> / Books
            </p>
            <div className={styles.grid}>
              <BookManagement />
            </div>
          </main>

          <Footer />
        </div>
      )}
    </Fragment>
  );
};

export default withProtectRoute(Books);
