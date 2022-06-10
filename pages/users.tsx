import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Menu } from '../components/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>User Management System</title>
        <meta name="abc book club" content="abc book club" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>User Management System</h1>
        <div className={styles.grid}>
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
  );
};

export default Users;
