import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { UserManagement } from '../components/UserManagement';
import 'bootstrap/dist/css/bootstrap.min.css';

const Books: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Book Management System</title>
        <meta name="abc book club" content="abc book club" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Book Management System</h1>
        <p>
          <Link href="/">Dashboard</Link> / Books
        </p>
        <div className={styles.grid}>
          <UserManagement />
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

export default Books;
