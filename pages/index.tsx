import Link from 'next/link';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create ABC Book club</title>
        <meta name="abc book club" content="abc book club" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/">ABC Book Club</Link>
        </h1>

        <div className={styles.grid}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={10}>
                <Nav variant="pills" className="flex-column mt-4">
                  <Nav.Item>
                    <Nav.Link eventKey="first">User Management</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Book Management</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={2}>
                <Tab.Content className="mt-4">
                  <Tab.Pane eventKey="first">
                    <InputGroup className="mb-3 mt-4">
                      <Form.Check type="checkbox" label="Admin" />
                    </InputGroup>
                    <InputGroup className="mb-3 mt-4">
                      <Form.Check type="checkbox" label="Editor" />
                    </InputGroup>
                    <Button variant="success">Login</Button>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <InputGroup className="mb-3 mt-4">
                      <Form.Check type="checkbox" label="Admin" />
                    </InputGroup>
                    <InputGroup className="mb-3 mt-4">
                      <Form.Check type="checkbox" label="Editor" />
                    </InputGroup>
                    <InputGroup className="mb-3 mt-4">
                      <Form.Check type="checkbox" label="Member" />
                    </InputGroup>
                    <Button variant="success">Login</Button>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
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

export default Home;
