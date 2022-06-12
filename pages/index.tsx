import React, { FC } from 'react';
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
import { UserContext } from '../components/Interface';

interface RoleProps {
  options: any;
  checked: boolean;
  onChange: any;
  section: string;
}
const OPTIONS = [
  { label: 'Admin', value: 1 },
  { label: 'Editor', value: 2 },
  { label: 'Member', value: 3 },
];

const Home: NextPage = () => {
  const { role, update } = React.useContext(UserContext);
  const [checked, setCheckBoxChecked] = React.useState(false);

  const Roles: FC<RoleProps> = (props): JSX.Element => {
    const arrSize = props.section === 'users' ? props.options.slice(0, 2) : props.options;
    return (
      <div>
        {arrSize instanceof Array &&
          arrSize.map((option, i) => (
            <InputGroup className="mb-3 mt-4" key={i}>
              <Form.Check
                type="checkbox"
                value={option.value}
                checked={option.value === props.checked}
                onChange={() => {
                  props.onChange(option.value);
                  update(option.value);
                }}
                label={option.label}
              />
            </InputGroup>
          ))}
      </div>
    );
  };

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
        <div>Name: {role}</div>
        <p>
          <Link href="/analytics">Analytics of books by Genre and year published</Link>
        </p>

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
                    <Roles
                      options={OPTIONS}
                      onChange={(value: any) => setCheckBoxChecked(value)}
                      checked={checked}
                      section="users"
                    />
                    <Link href="/users">
                      <Button variant="success">Login</Button>
                    </Link>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Roles
                      options={OPTIONS}
                      onChange={(value: any) => setCheckBoxChecked(value)}
                      checked={checked}
                      section="books"
                    />
                    <Link href="/books">
                      <Button variant="success">Login</Button>
                    </Link>
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
