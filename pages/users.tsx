import React, { Fragment } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserManagement } from '../components/Users/UserManagement';
import { RoleContext } from '../components/Interface';
import withProtectRoute from '../hoc/withProtectRoute';
import styles from '../styles/Home.module.css';

const Users: NextPage = () => {
  const { role } = React.useContext(RoleContext);
  return (
    <Fragment>
      {role && (
        <div className={styles.container}>
          <Header
            title="User Management System"
            metaName="abc book club"
            metaContent="abc book club"
          />
          <main className={styles.main}>
            <h1 className={styles.title}>User Management System</h1>
            <p className="mt-4">
              <Link href="/">Dashboard</Link> / Users
            </p>
            <div className={styles.grid}>
              <UserManagement />
            </div>
          </main>
          <Footer />
        </div>
      )}
    </Fragment>
  );
};

export default withProtectRoute(Users);
