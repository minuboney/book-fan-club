import type { NextPage } from 'next';
import Link from 'next/link';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie } from 'victory';
import { Container, Col, Row } from 'react-bootstrap';

import { genre, bookWithYear } from '../components/constants';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

const Analytics: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header
        title="Book Management System"
        metaName="abc book club"
        metaContent="abc book club"
      />
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
                <VictoryChart domainPadding={20}>
                  <VictoryAxis
                    tickValues={[1991, 1992, 1993, 1994]}
                    tickFormat={['Book 1', 'Book 2', 'Book 3', 'Book 4', 'Book 5']}
                  />
                  <VictoryAxis dependentAxis />
                  <VictoryBar data={bookWithYear} x="book" y="year" />
                </VictoryChart>
              </Col>
            </Row>
          </Container>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
