import React, { FC } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { RoleContext } from '../components/Interface';
import styles from '../styles/Home.module.css';
interface RoleProps {
  options: {
    label: string;
    value: number;
  }[];
  checked: boolean;
  onChange: (text: number) => void;
  section: string;
}
const OPTIONS = [
  { label: 'Admin', value: 1 },
  { label: 'Editor', value: 2 },
  { label: 'Member', value: 3 },
];

const Home: NextPage = () => {
  const { update } = React.useContext(RoleContext);
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
                checked={option.value === Number(props.checked)}
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
      <Header
        title="Create ABC Book club"
        metaName="abc book club"
        metaContent="abc book club"
      />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/">ABC Book Club</Link>
        </h1>
        <p className="pt-4">
          Click <Link href="/analytics">here</Link> to view the analytics of books by
          Genre and year published.
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
      <Footer />
    </div>
  );
};

export default Home;
