import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie } from 'victory';
import { Container, Col, Row } from 'react-bootstrap';
import { genre, bookWithYear } from '../components/constants';

const Analytics: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Book Management System</title>
        <meta name="abc book club" content="abc book club" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Analytics of books by Genre and year published</h1>
        <p className="mt-5">
          <Link href="/">Dashboard</Link> / Analytics
        </p>
        <div className={styles.grid}>
          <Container>
            <Row>
              <Col sm="6">
                <VictoryPie
                  data={genre}
                  colorScale={['blue', 'yellow', 'red', 'green', 'violet']}
                  radius={100}
                />
              </Col>
              <Col sm="6">
                <VictoryChart
                  // domainPadding will add space to each side of VictoryBar to
                  // prevent it from overlapping the axis
                  domainPadding={20}
                >
                  <VictoryAxis
                    // tickValues specifies both the number of ticks and where
                    // they are placed on the axis
                    tickValues={[1991, 1992, 1993, 1994]}
                    tickFormat={['Book 1', 'Book 2', 'Book 3', 'Book 4', 'Book 5']}
                  />
                  <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                  />
                  <VictoryBar data={bookWithYear} x="book" y="year" />
                </VictoryChart>
              </Col>
            </Row>
          </Container>
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

export default Analytics;
